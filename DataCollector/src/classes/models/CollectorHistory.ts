import { IndexSignature, Collector } from '../../types';
import MysqlEloquent from 'mysql-eloquent';

export interface CrawlerHistoryItem extends IndexSignature
{
  type?: Collector.Types;
  extra_data: object;
}

export default class CollectorHistory extends MysqlEloquent<CrawlerHistoryItem>
{
  protected databaseName: string = 'beaver';
  protected primaryKey: string = 'id';
  protected tableName: string = 'collector_history';

  public constructor()
  {
    super();
  }
}
