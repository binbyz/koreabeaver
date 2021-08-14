import Data24Handler from './handler/Data24Handler';
import { Collector, CircuitInterface, Data24 } from '../../types';
import CollectorHistory from '../models/CollectorHistory';
import { is_null } from 'slimphp';
import { logger } from '../../config/winston';
import { MdcinItem } from '../models/MdcinModel';

/**
 * 의약품행정처분서비스
 */
export default class MdcinCollector extends Data24Handler implements CircuitInterface.Bodies
{
  private static readonly encodingKey: string = process.env.MDCIN_ENCODING_KEY! || '';
  private static readonly decodingKey: string = process.env.MDCIN_DECODING_KEY! || '';

  private historyModel: CollectorHistory;
  private pageNo = 1;
  private readonly numOfRows = 100;

  public constructor()
  {
    super(MdcinCollector.encodingKey, MdcinCollector.decodingKey);
    super.setRequestUri(Data24.API_MDCIN_HOST + Data24.API_MDCIN_URI)

    this.historyModel = new CollectorHistory();
  }

  public boot()
  {
    // 이전 수집기 모델 히스토리
    this.historyModel.where('type', Collector.Types.DATA24_MDCIN).orderBy('id', 'desc');
  }

  public async prepare(): Promise<void>
  {
    // 한 페이지 리스트 갯수
    this.setNumOfRows(this.numOfRows);

    // 페이지 번호 구하기
    let r = await this.getPageNo();
    this.pageNo = r;
  }

  /**
   * 마지막 페이지 번호구하기
   * @returns number
   */
  private async getPageNo()
  {
    const historyOne = await this.historyModel.first();
    let pageNo = 1;

    if (!is_null(historyOne)) {
      pageNo = historyOne?.extra_data?.last_page ? (historyOne.extra_data.last_page + 1) : 1;
    }

    return pageNo;
  }

  public handle()
  {
    logger.info(`의약품행정처분 서비스를 호출합니다. (page: ${this.pageNo})`);
    logger.info(this.getRequestUriWithParams());

    // 실제 API 페이지를 호출합니다.
    this.handleContents();
  }

  private async handleContents()
  {
    await this.call()
      .then(response => {
        this.loadXML(response)

        if (!this.isValidContent()) {
          throw new Error(`유효하지 않는 컨텐츠입니다.`);
        }

        const items: Array<MdcinItem> = this.content.response.body.items.item;

        // upsert massive
        await this.upserts(items, 'ADM_DISPS_SEQ', ['ENTP_NAME', 'ADDR', 'ITEM_NAME']);
      })
      .catch(e => logger.error(e.message));
  }

  public error()
  {
  }

  public always()
  {
  }
}
