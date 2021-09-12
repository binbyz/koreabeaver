import { IndexSignature } from '../../types';
import MysqlEloquent from 'mysql-eloquent';

export interface MdcinItem extends IndexSignature
{
  ADM_DISPS_SEQ: number; // 행정처분일련번호
  ENTP_NAME: string; // 업소명
  ADDR: string | null; // 업소소재지
  ENTP_NO: number; // 업허가번호
  ITEM_NAME: string; // 제품명
  BEF_APPLY_LAW: string | null; // 위반법명
  EXPOSE_CONT: string; // 위반내용
  ADM_DISPS_NAME: string; // 행정처분명
  LAST_SETTLE_DATE: number | null; // 행정처분일자 (최종확정일자)
  DISPS_TERM_DATE: string; // 행정처분기간
}

export default class MdcinModel extends MysqlEloquent<MdcinItem>
{
  protected databaseName: string = 'beaver';
  protected primaryKey: string = 'id';
  protected tableName: string = 'data24_raw_mdcin';

  public constructor()
  {
    super();
  }
}
