import Model from './Model';
import { Data24 } from '../../types';
import { logger } from '../../../config/winston';

export default class Data24Model extends Model
{
  /**
   * Data24 API의 응답 데이터가 유효한지 확인합니다.
   */
  protected isValidResponse(): boolean
  {
    if (typeof this.content == 'object' && 'response' in this.content) {
      if (!Object.values(Data24.ResponseError).includes(this.content.response.header.resultCode)) {
        return true;
      } else {
        logger.error(`is invalid response (CODE: ${this.content.response.header.resultCode})`);
      }
    }

    logger.error(`cannot parsing response data: ${JSON.stringify(this.content)}`);
    return false;
  }
}
