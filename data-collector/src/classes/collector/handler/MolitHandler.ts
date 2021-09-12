import { Data24 } from '../../../types';
import Data24Handler from './Data24Handler';

export default class MolitHandler extends Data24Handler implements Data24.Data24HandlerInterface
{
  public constructor(encodingKey: string, decodingKey: string | undefined = undefined)
  {
    super(encodingKey, decodingKey);

    this.requestParams = {
      "numOfRows": 1,
      "pageNo": 1,
      "LAWD_CD": null,
      "DEAL_YMD": null,
      "ServiceKey": this.encodingKey,
    };
  }

  /**
   * 지역코드
   * @param code 지역코드
   */
  public setLawdCd(code: string): void
  {
    this.requestParams.LAWD_CD = code.trim();
  }

  /**
   * 계약월
   * @param ymd 계약월
   */
  public setDealYmd(ymd: string): void
  {
    this.requestParams.DEAL_YMD = ymd.trim();
  }
}
