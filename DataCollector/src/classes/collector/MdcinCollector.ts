import Data24Handler from './handler/Data24Handler';
import { Collector, CircuitInterface, Data24 } from '../../types';
import CollectorHistory from '../models/CollectorHistory';
import { is_null } from 'slimphp';

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

  public boot(): boolean
  {
    // 이전 수집기 모델 히스토리
    this.historyModel.where('type', Collector.Types.DATA24_MDCIN).orderBy('id', 'desc');

    return true;
  }

  public prepare(): boolean
  {
    // 이전 히스토리 구하기
    // const historyOne = (async () => await this.historyModel.first())();

    // if (is_null(historyOne)) {
    //   this.pageNo = historyOne?.extra_data?.last_page ? (historyOne.extra_data.last_page + 1) : 1;
    // }

    // this.setNumOfRows(this.numOfRows);

    return true;
  }

  public handle(): boolean
  {
    return false;
  }

  public except(): void
  {
  }
}
