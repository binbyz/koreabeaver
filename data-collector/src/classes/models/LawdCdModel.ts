import MysqlEloquent from "mysql-eloquent";
import { IndexSignature } from "../../types";

export type CityCodeType = string;

export enum CityCode {
  SEOUL = "1100000000",
  SEOUL_YONGSAN = "1117000000",
  SEOUL_GEUMCHUN = "1154500000",
}

export interface LawdCdItem extends IndexSignature
{
  code: CityCodeType;
  addr: string;
  exists: "존재" | "폐지";
}

/**
 * 법정동코드
 */
export default class LawdCdModel extends MysqlEloquent<LawdCdItem>
{
  protected databaseName: string = 'koreabeaver';
  protected primaryKey: string = 'code';
  protected tableName: string = 'LAWD_CD';

  public constructor()
  {
    super();
  }
}
