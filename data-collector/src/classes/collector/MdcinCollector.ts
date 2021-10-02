import Data24Handler from './handler/Data24Handler';
import { Collector, Data24 } from '../../types';
import { CircuitInterface } from '../circuit/CircuitInterface';
import CircuitModel from '../models/CircuitModel';
import { is_null, is_array } from 'slimphp';
import { logger } from '../../config/winston';
import MdcinModel, { MdcinItem } from '../models/MdcinModel';
import moment from 'moment';

/**
 * 의약품행정처분서비스
 */
export default class MdcinCollector extends Data24Handler implements CircuitInterface.Bodies
{
  private static readonly encodingKey: string = process.env.MDCIN_ENCODING_KEY! || '';
  private static readonly decodingKey: string = process.env.MDCIN_DECODING_KEY! || '';

  private mdcinModel: MdcinModel;
  private historyModel: CircuitModel;
  private readonly numOfRows = 100; // NO MANDATORY REQUEST PARAMETERS ERROR! numOfRows maximum is =[100]
  private pageNo: number = 1;

  public constructor()
  {
    super(MdcinCollector.encodingKey, MdcinCollector.decodingKey);
    super.setRequestUri(Data24.API_MDCIN_HOST + Data24.API_MDCIN_URI)

    this.mdcinModel = new MdcinModel();
    this.historyModel = new CircuitModel();
  }

  public boot()
  {
    // 한 페이지 리스트 갯수
    this.setNumOfRows(this.numOfRows);

    // 이전 수집기 모델 히스토리
    this.historyModel.where('type', Collector.Types.DATA24_MDCIN).orderBy('id', 'desc');
  }

  public async prepare(): Promise<void>
  {
    this.pageNo = await this.getPageNo();

    this.setPageNo(this.pageNo);
  }

  /**
   * 마지막 페이지 번호구하기
   * @returns number
   */
  private async getPageNo()
  {
    const collectorHistory = await this.historyModel.first();
    let pageNo = 1;

    if (!is_null(collectorHistory)) {
      pageNo = collectorHistory.extra_data.last_page + 1;
    }

    return pageNo;
  }

  public async handle()
  {
    logger.info(`의약품행정처분 서비스를 호출합니다. (requestParams: ${JSON.stringify(this.requestParams)})`);
    logger.info(this.getRequestUriWithParams());

    const items: MdcinItem[] = await this.getItems();

    this.updateContentsAndHistory(items);
  }

  private async getItems(): Promise<MdcinItem[]>
  {
    return this.call()
      .then(response => {
        this.loadXML(response);

        // 데이터 유효성 검사
        this.isValidResponse();

        return is_array(this.content.response.body.items.item)
                  ? this.content.response.body.items.item
                  : [];
      });
  }

  private async updateContentsAndHistory(items: MdcinItem[])
  {
    if (items.length) {
      // upsert massive
      await this.mdcinModel.upserts(items, 'ADM_DISPS_SEQ', ['ENTP_NAME', 'ADDR', 'ITEM_NAME']);
    }

    // 마지막 히스토리 업데이트
    this.updateHistory();
  }

  private updateHistory(): void
  {
    this.historyModel.clear();
    this.historyModel.where('type', Collector.Types.DATA24_MDCIN).update({
      "extra_data": {
        "last_page": this.pageNo,
        "last_updated": moment().format('YYYY-MM-DD HH:mm:ss')
      }
    });
  }

  public always()
  {
    this.historyModel.clear();
    this.mdcinModel.clear();
  }
}
