import ModelHandler from './handler/ModelHandler';
import { IndexSignature, Collector } from '../../types';

interface CrawlerHistoryItem extends IndexSignature
{
  type?: Collector.Types;
  extra_data: object;
}

export default class CollectorHistory extends ModelHandler<CrawlerHistoryItem>
{
  protected tableName: string = 'collector_history';
}
