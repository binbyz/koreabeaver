import Data24Model from './Data24Model';
import { Data24 } from '../../types';

export default class MdcinModel extends Data24Model implements Data24.ModelHandler
{
  public constructor()
  {
    super();
  }

  /**
   * handle
   */
  public handle(): boolean
  {
    if (!this.isValidResponse()) {
      return false;
    }

    const items = this.content.response.body.items;

    return true;
  }
}
