import { IndexSignature } from '../../types';
import MysqlEloquent from 'mysql-eloquent';

export interface AptTradeItem extends IndexSignature
{
  serial_number: string; // 일련번호 (PK)
  apartment_name: string; // 아파트명
  deal_amount: number; // 거래금액 (`,` 제거)
  build_year: number; // 건축년도
  deal_year: number; // 계약년도
  deal_month: number // 계약월
  deal_day: number; // 계약일
  floor: string; // 층수
  road_name: string; // 도로명
  road_name_bonbun: string; // 도로명건물본번코드
  road_name_bubun: string; // 도로명건물부번호코드
  road_name_sigungu_code: string; // 도로명시군구코드
  road_name_seq: number; // 도로명일련번호코드
  road_name_basement_code: string; // 도로명지상지하코드
  road_name_code: string; // 도로명코드
  land_code: string; // 법정동지번코드
  dong: string; // 법정동
  bonbun: string; // 법정동돈번코드
  bubun: string; // 벙정동부번코드
  jibun: number; // 지번
  sigungu_code: string; // 대상물건의 시군구코드
  eubmyundong_code: string; // 대상물건의 읍면동코드
  area_for_exclusive_use: number; // 전용면적 (제곱미터)
  regional_code: string; // 지역코드
  cancel_deal_type: number; // 해제여부(1=해제, 0=비해제),
  cancel_deal_day: string; // 해제사유발생일
}

export default class AptTradeModel extends MysqlEloquent<AptTradeItem>
{
  protected databaseName: string = 'beaver';
  protected primaryKey: string = 'id';
  protected tableName: string = 'molit_raw_apt_trade';

  public constructor()
  {
    super();
  }
}
