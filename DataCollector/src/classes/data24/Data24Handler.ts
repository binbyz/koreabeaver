import RequestHandler from '../request/RequestHandler';
import { Data24 } from '../../types';

export default class Data24Handler extends RequestHandler implements Data24.Data24HandlerInterface
{
  private encodingKey: string;
  private decodingKey: string | undefined;

  protected requestUri: string | null = null;
  private requestParams: Data24.RequestParams;

  public constructor(encodingKey: string, decodingKey: string | undefined = undefined)
  {
    super()

    this.encodingKey = encodingKey
    this.decodingKey = decodingKey

    this.requestParams = {
      "rows": 1,
      "page": 1,
      "ServiceKey": this.encodingKey,
    };
  }

  public call(): Promise<string>
  {
    if (this.requestUri == null) {
      throw new Error(`API가 호출되기 전 URI가 할당되어야 합니다.`);
    }

    const requestUriWithParams = `${this.requestUri}?${this.makeRequestParams()}`;

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

  /**
   * 공통 Params
   */
  public setNumOfRows(rows: number): void
  {
    this.requestParams.rows = rows
  }

  /**
   * 공통 Params
   */
  public setPageNo(page: number): void
  {
    this.requestParams.page = page
  }

  protected getEncodingKey(): string
  {
    return this.encodingKey
  }

  protected getDecodingKey(): string | undefined
  {
    return this.decodingKey
  }
}
