import MolitHandler from './handler/MolitHandler';
import { CircuitInterface, Data24, Collector } from '../../types';
import CollectorHistory from '../models/CollectorHistory';

/**
 * 국토교통부 아파트매매 실거래 상세 자료
 */
export default class AptTradeCollector extends MolitHandler implements CircuitInterface.Bodies
{
  private static readonly encodingKey: string = process.env.APT_TRADE_ENCODING_KEY! || '';
  private static readonly decodingKey: string = process.env.APT_TRADE_DECODING_KEY! || '';

  private historyModel: CollectorHistory;
  private readonly numOfRows = 1000;

  public constructor()
  {
    super(AptTradeCollector.encodingKey, AptTradeCollector.decodingKey)
    super.setRequestUri(Data24.API_APT_TRADE + Data24.API_APT_TRADE)

    this.historyModel = new CollectorHistory();
  }

  public boot()
  {
    // 한 페지 리트 갯수
    this.setNumOfRows(this.numOfRows);

    // 이전 수집기 모델 히스토리
    this.historyModel.where('type', Collector.Types.APT_TRADE).orderBy('id', 'desc');
  }

  public async prepare(): Promise<void>
  {
  }

  public handle()
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
