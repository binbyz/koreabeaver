import EnvironmentHandler from './EnvironmentHandler';
import { Data24 } from '../../../types';
import { logger } from '../../../config/winston';

export default class Data24Handler extends EnvironmentHandler implements Data24.Data24HandlerInterface
{
  protected requestUri: string | null = null;
  private requestParams: Data24.RequestParams;
  public readonly ERR_URI_NOT_SET = 'A URI must be assigned before the API is called.';

  public constructor(encodingKey: string, decodingKey: string | undefined = undefined)
  {
    super(encodingKey, decodingKey);

    this.requestParams = {
      "numOfRows": 1,
      "pageNo": 1,
      "ServiceKey": this.encodingKey,
    };
  }

  public call(): Promise<string>
  {
    if (this.requestUri == null) {
      logger.error(this.ERR_URI_NOT_SET);
      throw new Error(this.ERR_URI_NOT_SET);
    }

    const requestUriWithParams = `${this.requestUri}?${this.makeRequestParams()}`;
    logger.info(`Data24Handler Call: ${requestUriWithParams}`);

    return super.get(requestUriWithParams);
  }

  private makeRequestParams(): string
  {
    const params = [];

    for (let key of Object.keys(this.requestParams)) {
      params.push(`${key}=${this.requestParams[key]}`);
    }

    return params.join('&');
  }

  public setRequestUri(requestUri: string): void
  {
    this.requestUri = requestUri.trim();
  }

  public setNumOfRows(rows: number): void
  {
    this.requestParams.numOfRows = rows;
  }

  public setPageNo(page: number): void
  {
    this.requestParams.pageNo = page;
  }
}
