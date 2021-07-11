import Data24Handler from '../data24/Data24Handler'

/**
 * 의약품행정처분서비스
 */
export default class Mdcin extends Data24Handler
{
  public constructor(encodingKey: string, decodingKey: string | undefined = undefined)
  {
    super(encodingKey, decodingKey)
  }
}