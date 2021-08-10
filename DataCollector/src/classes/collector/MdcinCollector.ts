import Data24Handler from './handler/Data24Handler';
import { Data24 } from '../../types';

/**
 * 의약품행정처분서비스
 */
export default class MdcinCollector extends Data24Handler
{
  public constructor(encodingKey: string, decodingKey: string | undefined = undefined)
  {
    super(encodingKey, decodingKey)
    super.setRequestUri(Data24.API_MDCIN_HOST + Data24.API_MDCIN_URI)
  }
}
