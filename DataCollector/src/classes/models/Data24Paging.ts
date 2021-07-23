import Data24Model from './Data24Model';
import { Data24, IndexSignature } from '../../types';

interface PagingItem extends IndexSignature
{

}

export default class Data24Paging extends Data24Model<PagingItem> implements Data24.ModelHandler
{
  protected tableName: string = 'data24_db_paging';

  public handle(): boolean
  {
    return true;
  }
}
