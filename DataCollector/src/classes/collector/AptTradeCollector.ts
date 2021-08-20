import MolitHandler from './handler/MolitHandler';
import { CircuitInterface, Data24, Collector } from '../../types';
import CollectorHistoryModel from '../models/CollectorHistoryModel';
import { CityCodeType, Cities } from '../models/LawdCdModel';
import AptTradeModel, { AptKeyNameExchanger, AptTradeItem } from '../models/AptTradeModel';
import { is_undefined, is_null, date } from 'slimphp';
import { logger } from '../../config/winston';

/**
 * 국토교통부 아파트매매 실거래 상세 자료
 */
export default class AptTradeCollector extends MolitHandler implements CircuitInterface.Bodies
{
  private static readonly encodingKey: string = process.env.APT_TRADE_ENCODING_KEY! || '';
  private static readonly decodingKey: string = process.env.APT_TRADE_DECODING_KEY! || '';

  private historyModel: CollectorHistoryModel;
  private aptTradeModel: AptTradeModel;
  private readonly numOfRows = 1000;
  private readonly sampleDealYmd = date('Ym');
  private targetCities: string[] = [];
  private pageNumberMap = new Map<CityCodeType, number>();

  public constructor()
  {
    super(AptTradeCollector.encodingKey, AptTradeCollector.decodingKey)
    super.setRequestUri(Data24.API_APT_TRADE + Data24.API_APT_TRADE_URI)

    this.historyModel = new CollectorHistoryModel();
    this.aptTradeModel = new AptTradeModel();
  }

  public boot()
  {
    // 한 페지 리트 갯수
    this.setNumOfRows(this.numOfRows);

    // 이전 수집기 모델 히스토리
    this.historyModel.where('type', Collector.Types.APT_TRADE).orderBy('id', 'desc');

    // 수집 도시들 타겟을 설정합니다.
    this.targetCities = [
      Cities.SEOUL_GEUMCHUN,
      // Cities.SEOUL_YONGSAN,
    ];
  }

  public async prepare(): Promise<void>
  {
    this.getPageNoGroupByCityCode();
  }

  /**
   * 도시코드별 마지막 페이지 번호를 구합니다.
   */
  private async getPageNoGroupByCityCode()
  {
    const collectorHistory = await this.historyModel.first();

    if (!is_null(collectorHistory)) {
      for (let idx in collectorHistory.extra_data.last_page) {
        let history = collectorHistory.extra_data.last_page[idx];

        // 지역코드별 이전 히스토리 캐시
        this.pageNumberMap.set(history.city_code, history.last_page);
      }
    }
  }

  public handle()
  {
    this.targetCities.forEach(async cityCode => {
      // 지역 코드 설정
      this.setLawdCd(cityCode.substr(0, 5));

      // 샘플 수집 데이터 설정
      this.setDealYmd(this.sampleDealYmd);

      // 마지막 페이지 설정
      if (this.pageNumberMap.has(cityCode)) {
        this.setPageNo(this.pageNumberMap.get(cityCode)!);
      } else {
        this.setPageNo(1);
      }

      logger.info(`국토교통부 아파트매매 실거래 상세 자료를 호출합니다. (requestParams: ${JSON.stringify(this.requestParams)})`);
      logger.info(this.getRequestUriWithParams());

      await this.call()
        .then(async response => {
          this.loadXML(response);

          // 데이터 유효성 검사
          this.isValidContent();

          // 데이터 영문 데이터로 변환
          const converted: Array<AptTradeItem> = this.convertAptTradeItems(this.content.response.body.items.item);

          console.log(converted);

          // upsert massive
          await this.aptTradeModel.upserts(converted, 'uuid', ['deal_amount']);
        })
        .catch (e => logger.error(e.stack));
    });
  }

  private convertAptTradeItems(items: []): Array<AptTradeItem>
  {
    const result: Array<AptTradeItem> = [];

    items.forEach(itemKr => {
      let row = <AptTradeItem>{};

      for (let keyNameKr in itemKr as object) {
        let keyNameEn = AptKeyNameExchanger[keyNameKr];
        let value: any = itemKr[keyNameKr];

        row[keyNameEn] = AptTradeModel.typeCasting(keyNameEn, value);
      }

      // make `uuid`
      row['uuid'] = AptTradeModel.makeUUID(row);

      result.push(row);
    });

    return result;
  }

  public except(): void
  {
  }

  public always()
  {
    this.historyModel.clear();
  }
}
