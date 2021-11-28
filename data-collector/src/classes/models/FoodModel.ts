import { IndexSignature } from '../../types';
import MysqlEloquent from 'mysql-eloquent';

export interface FoodItem extends IndexSignature
{
  PRDUCT: string;
  ENTRPS: string;
  ADRES1: string | null;
  FOUND_CN: string | null;
  DSPS_DT: string | null;
  DSPS_CMMND: string | null;
  VIOLT: string | null;
  EVDNC_FILE: string | null;
}

export default class FoodModel extends MysqlEloquent<FoodItem>
{
  protected databaseName: string = 'koreabeaver';
  protected primaryKey: string = 'id';
  protected tableName: string = 'data24_raw_food';

  public constructor()
  {
    super();
  }
}
