import Data24Handler from './handler/Data24Handler';
import { Collector, Circuit, Data24 } from '../../types';
import CollectorHistory from '../models/CollectorHistory';

/**
 * 의약품행정처분서비스
 */
export default class MdcinCollector extends Data24Handler implements Circuit
{
  private historyModel: CollectorHistory;

  public constructor(encodingKey: string, decodingKey: string | undefined = undefined)
  {
    super(encodingKey, decodingKey)
    super.setRequestUri(Data24.API_MDCIN_HOST + Data24.API_MDCIN_URI)

    this.historyModel = new CollectorHistory();
  }

  public boot(): boolean
  {
    this.historyModel.where('type', Collector.Types.DATA24_MDCIN).orderBy('id', 'desc');
    return true;
  }

  public prepare(): boolean
  {

  }

  public handle(): boolean
  {

  }
}
