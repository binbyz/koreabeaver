import { IndexSignature } from '../../types';
import MysqlEloquent from 'mysql-eloquent';

export interface AptTradeItem extends IndexSignature
{
  // TODO
}

export default class AptTradeModel extends MysqlEloquent<AptTradeItem>
{
  protected databaseName: string = 'beaver';
  protected primaryKey: string = 'id';
  protected tableName: string = 'molit_raw_apttrade';

  public constructor()
  {
    super();
  }
}
