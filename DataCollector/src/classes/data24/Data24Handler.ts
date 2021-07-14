import RequestHandler from '../request/RequestHandler';

export default class Data24Handler extends RequestHandler
{
  private encodingKey: string;
  private decodingKey: string | undefined;
  private rows: number = 1;
  private page: number = 1;
  protected requestUri: string | null = null;

  public constructor(encodingKey: string, decodingKey: string | undefined = undefined)
  {
    super()

    this.encodingKey = encodingKey
    this.decodingKey = decodingKey
  }

  public request(): Promise<string>
  {
    if (this.requestUri == null) {
      throw new Error(`API가 호출되기 전 URI가 할당되어야 합니다.`);
    }

    return super.get(this.requestUri);
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
    this.rows = rows
  }

  /**
   * 공통 Params
   */
  public setPageNo(page: number): void
  {
    this.page = page
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
