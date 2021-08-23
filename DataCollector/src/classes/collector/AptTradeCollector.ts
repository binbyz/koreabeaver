import MolitHandler from './handler/MolitHandler';
import { CircuitInterface, Data24, Collector } from '../../types';
import CollectorHistoryModel, { CrawlerHistoryItem, LastPageItem } from '../models/CollectorHistoryModel';
import { CityCodeType, Cities } from '../models/LawdCdModel';
import AptTradeModel, { AptKeyNameExchanger, AptTradeItem } from '../models/AptTradeModel';
import { is_undefined, is_null, date } from 'slimphp';
import { logger } from '../../config/winston';
import moment from 'moment';

/**
 * 국토교통부 아파트매매 실거래 상세 자료
 */
export default class AptTradeCollector extends MolitHandler implements CircuitInterface.Bodies
{
  private static readonly encodingKey: string = process.env.APT_TRADE_ENCODING_KEY! || '';
  private static readonly decodingKey: string = process.env.APT_TRADE_DECODING_KEY! || '';

  private historyModel: CollectorHistoryModel;
  private aptTradeModel: AptTradeModel;
  private readonly numOfRows = 500;
  private targetCities: string[] = [];

  private hModel: CrawlerHistoryItem = {
    "type": 0,
    "extra_data": {
      "last_page": [],
      "last_updated": "",
    },
  };

  private hPageNumberMap = new Map<CityCodeType, number>();
  private hDateMap = new Map<CityCodeType, string>();

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
    await this.getHistoryGroupByCityCode();
  }

  /**
   * 도시코드별 마지막 페이지 번호를 구합니다.
   */
  private async getHistoryGroupByCityCode()
  {
    this.hModel = await this.historyModel.first();

    if (!is_null(this.hModel)) {
      for (let idx in this.hModel.extra_data.last_page) {
        let history = this.hModel.extra_data.last_page[idx];

        // 지역코드별 이전 히스토리 캐시
        this.hPageNumberMap.set(history.city_code!, !is_undefined(history.last_page) ? history.last_page : 1);

        // 지역코드별 이전 마지막 검색날짜 캐시
        this.hDateMap.set(history.city_code!, !is_undefined(history.date) ? history.date : date('Ym'));
      }
    } else {
      throw new Error(`히스토리가 설정돼 있지 않습니다. (Collector.Types: ${Collector.Types.APT_TRADE})`);
    }
  }

  public handle()
  {
    this.targetCities.forEach(async cityCode => {
      const dealYmd = this.hDateMap.has(cityCode) ? this.hDateMap.get(cityCode)! : date('Ym');
      const pageNo = this.hPageNumberMap.has(cityCode) ? this.hPageNumberMap.get(cityCode)! : 1;

      // 지역 코드 설정
      this.setLawdCd(cityCode.substr(0, 5));

      // 샘플 수집 데이터 설정
      this.setDealYmd(dealYmd);

      // 마지막 페이지 설정
      this.setPageNo(pageNo);

      logger.info(`국토교통부 아파트매매 실거래 상세 자료를 호출합니다. (requestParams: ${JSON.stringify(this.requestParams)})`);
      logger.info(this.getRequestUriWithParams());

      await this.call()
        .then(async response => {
          this.loadXML(response);

          // 데이터 유효성 검사
          this.isValidContent();

          // 데이터 영문 데이터로 변환
          const converted: Array<AptTradeItem> = this.convertAptTradeItems(this.content.response.body.items.item);

          // upsert massive
          // await this.aptTradeModel.upserts(converted, 'uuid', ['deal_amount']);

          // 마지막 히스토리 저장
          this.updateHistory(
            this.getUpdateHistory(
              {
                "city_code": cityCode,
                "date": dealYmd,
                "page": pageNo,
              },
              converted.length
            )
          );
        })
        .catch (e => logger.error(e.stack));
    });
  }

  private convertAptTradeItems(items: []): Array<AptTradeItem>
  {
    let result: Array<AptTradeItem> = [];

    items.forEach(itemKr => {
      let row = <AptTradeItem>{};

      for (let keyNameKr in itemKr as object) {
        let keyNameEn = AptKeyNameExchanger[keyNameKr];
        let value: any = itemKr[keyNameKr];

        row[keyNameEn] = AptTradeModel.typeCasting(keyNameEn, value);
      }

      // make `uuid`
      row['uuid'] = AptTradeModel.makeUUID(row);

      // push
      result.push(row);
    });

    // 필요한 필드가 할당이 되어 있는지 체크, 없으면 필드 할당
    result = AptTradeModel.fillNecessaryFields(result);

    // 필드들의 순서를 유지시킵니다.
    result = AptTradeModel.keepSafeFieldOrder(result);

    return result;
  }

  /**
   * 업데이트시킬 히스토리 아이템을 반환합니다.
   */
  private getUpdateHistory(item: LastPageItem, itemCount: number): LastPageItem[]
  {
    const without = this.hModel.extra_data.last_page.filter(r => item.city_code != r.city_code);

    if (itemCount < this.numOfRows) {
      item.page = 1;
      item.date = moment(item.date).add(1, 'months').format('YYYYMM');
    } else {
      item.page++;
    }

    // push `new` history
    without.push(item);

    return without;
  }

  private updateHistory(updater: LastPageItem[]): void
  {
  }

  public except(): void
  {
  }

  public always()
  {
    this.historyModel.clear();
  }
}
