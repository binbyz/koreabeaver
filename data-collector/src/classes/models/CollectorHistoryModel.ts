import { IndexSignature, Collector } from '../../types';
import MysqlEloquent from 'mysql-eloquent';

export interface CrawlerHistoryItem extends IndexSignature
{
  "type": Collector.Types;
  "extra_data": ExtraDataItem;
}

export interface ExtraDataItem extends IndexSignature
{
  "last_page": LastPageItem[],
  "last_updated": string,
}

export interface LastPageItem extends IndexSignature
{
  "date": string;
  "city_code"?: string;
  "page": number;
}

export default class CollectorHistoryModel extends MysqlEloquent<CrawlerHistoryItem>
{
  protected databaseName: string = 'beaver';
  protected primaryKey: string = 'id';
  protected tableName: string = 'collector_history';

  public constructor()
  {
    super();
  }
}
