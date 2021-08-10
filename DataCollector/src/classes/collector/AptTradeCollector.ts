import Data24Handler from '../data24/Data24Handler';
import { Data24 } from '../../types';

/**
 * 국토교통부 아파트매매 실거래 상세 자료
 */
export default class AptTradeCollector extends Data24Handler
{
  public constructor(encodingKey: string, decodingKey: string | undefined = undefined)
  {
    super(encodingKey, decodingKey)
    super.setRequestUri(Data24.API_APT_TRADE + Data24.API_APT_TRADE)
  }


}
