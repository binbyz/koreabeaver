import Model from './Model';
import { IndexSignature, Collector } from '../../types';

interface CrawlerHistoryItem extends IndexSignature
{
  type?: Collector.Types;
  extra_data: object;
}

export default class CollectorHistory extends Model<CrawlerHistoryItem>
{
  protected tableName: string = 'collector_history';
}
