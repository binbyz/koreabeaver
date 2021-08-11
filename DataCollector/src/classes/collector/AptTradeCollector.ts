import MolitHandler from './handler/MolitHandler';
import { Circuit, Data24, Collector } from '../../types';
import CollectorHistory from '../models/CollectorHistory';

/**
 * 국토교통부 아파트매매 실거래 상세 자료
 */
export default class AptTradeCollector extends MolitHandler implements Circuit
{
  private historyModel: CollectorHistory;

  public constructor(encodingKey: string, decodingKey: string | undefined = undefined)
  {
    super(encodingKey, decodingKey)
    super.setRequestUri(Data24.API_APT_TRADE + Data24.API_APT_TRADE)

    this.historyModel = new CollectorHistory();
  }

  public boot(): boolean
  {
    this.historyModel.where('type', Collector.Types.APT_TRADE).orderBy('id', 'desc');
    return true;
  }

  public prepare(): boolean
  {

  }

  public handle(): boolean
  {

  }
}
