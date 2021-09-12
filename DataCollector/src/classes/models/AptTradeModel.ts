import { IndexSignature } from '../../types';
import MysqlEloquent from 'mysql-eloquent';
import { sprintf } from 'slimphp';

export const AptKeyNameExchanger: { [k: string]: string } = {
  "일련번호": "serial_number",
  "아파트": "apartment_name",
  "거래금액": "deal_amount",
  "건축년도": "build_year",
  "년": "deal_year", // 계약년도
  "월": "deal_month", // 계약월
  "일": "deal_day", // 계약일
  "층": "floor",
  "도로명": "road_name",
  "도로명건물본번호코드": "road_name_bonbun",
  "도로명건물부번호코드": "road_name_bubun",
  "도로명시군구코드": "road_name_sigungu_code",
  "도로명일련번호코드": "road_name_seq",
  "도로명지상지하코드": "road_name_basement_code",
  "도로명코드": "road_name_code",
  "법정동지번코드": "land_code",
  "법정동": "dong",
  "법정동본번코드": "bonbun",
  "법정동부번코드": "bubun",
  "지번": "jibun",
  "법정동시군구코드": "sigungu_code",
  "법정동읍면동코드": "eubmyundong_code",
  "전용면적": "area_for_exclusive_use",
  "지역코드": "regional_code",
  "해제여부": "cancel_deal_type",
  "해제사유발생일": "cancel_deal_day",
};

export interface AptTradeItem extends IndexSignature
{
  serial_number: string; // 일련번호
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
  bonbun: string; // 법정동본번코드
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

  /**
   * 테이블에 삽입되기 위해 필요한 필드명과 그리고 순서유지
   */
  protected static readonly keepSafeFields: string[] = [
    'uuid', // 해당 키는 테이블에만 존재하는 커스텀 `uuid`
    'serial_number',
    'apartment_name',
    'deal_amount',
    'build_year',
    'deal_year',
    'deal_month',
    'deal_day',
    'floor',
    'road_name',
    'road_name_bonbun',
    'road_name_bubun',
    'road_name_sigungu_code',
    'road_name_seq',
    'road_name_basement_code',
    'road_name_code',
    'land_code',
    'dong',
    'bonbun',
    'bubun',
    'jibun',
    'sigungu_code',
    'eubmyundong_code',
    'area_for_exclusive_use',
    'regional_code',
    'cancel_deal_type',
    'cancel_deal_day',
  ];

  public constructor()
  {
    super();
  }

  /**
   * 한 행을 구분할 수 있는 유니크 아이디를 반환합니다.
   */
  public static makeUUID(item: AptTradeItem): string
  {
    return sprintf(
      '%s-%s-%s-%s-%s-%s-%s-%s',
      `${item.deal_year}${item.deal_month}${item.deal_day}`,
      item.regional_code,
      item.sigungu_code,
      item.eubmyundong_code,
      item.bonbun,
      item.bubun,
      item.jibun,
      item.floor
    );
  }

  /**
   * `API` 상에서 빠진 필드를 찾아 채워넣습니다.
   */
  public static fillNecessaryFields(items: AptTradeItem[]): AptTradeItem[]
  {
    items.forEach((item, idx) => {
      AptTradeModel.keepSafeFields.forEach(field => {
        if (!(field in item)) {
          items[idx][field] = AptTradeModel.typeCasting(field, '');
        }
      });
    });

    return items;
  }

  /**
   * 필드의 순서를 고정시키기 위해 사용됩니다.
   * `upserts` 같은 쿼리에서는 오브젝트의 `key` 순서가 중요시 됩니다.
   */
  public static keepSafeFieldOrder(items: AptTradeItem[]): AptTradeItem[]
  {
    let result: AptTradeItem[] = [];

    items.forEach(item => {
      let copy = <AptTradeItem>{};

      AptTradeModel.keepSafeFields.forEach(keepf => {
        copy[keepf] = item[keepf];
      });

      result.push(copy);
    });

    return result;
  }

  public static typeCasting(key: string, value: any): string | number
  {
    switch (key) {
      case 'deal_amount': // 거래금액 변환
        value = parseInt(String(value).replace(/\./g, ''), 10);
        break;
      case 'serial_number':
      case 'apartment_name':
      case 'road_name':
      case 'road_name_bonbun':
      case 'road_name_bubun':
      case 'road_name_sigungu_code':
      case 'road_name_basement_code':
      case 'road_name_code':
      case 'land_code':
      case 'dong':
      case 'bonbun':
      case 'bubun':
      case 'sigungu_code':
      case 'eubmyundong_code':
      case 'regional_code':
      case 'cancel_deal_day':
      case 'road_name_seq':
        value = String(value).toString().trim();
        break;
      case 'deal_amount':
      case 'build_year':
      case 'deal_year':
      case 'deal_month':
      case 'deal_day':
      case 'jibun':
      case 'area_for_exclusive_use':
        value = parseInt(value, 10);
        break;
      case 'floor':
        value = parseInt(value, 10);

        if (!value) {
          value = null;
        }
        break;
      case 'cancel_deal_type':
        value = (!!value) ? 1 : 0;
        break;
      default:
    }

    return value;
  }
}
