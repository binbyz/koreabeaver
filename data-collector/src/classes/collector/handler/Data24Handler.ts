import EnvironmentHandler from './EnvironmentHandler';
import { Data24 } from '../../../types';
import XMLParser from 'fast-xml-parser';

export default class Data24Handler extends EnvironmentHandler implements Data24.Data24HandlerInterface
{
  public readonly ERR_URI_NOT_SET = 'A URI must be assigned before the API is called.';

  protected requestUri: string | null = null;
  protected requestParams: Data24.RequestParams;
  protected contentType: Data24.ModelContents;
  protected content: any = null;

  public constructor(encodingKey: string, decodingKey: string | undefined = undefined)
  {
    super(encodingKey, decodingKey);

    this.requestParams = {
      "numOfRows": 1,
      "pageNo": 1,
      "ServiceKey": this.encodingKey,
    };

    this.contentType = Data24.ModelContentTypes.CONTENT;
  }

  public loadContent(rawContent: string): this
  {
    this.contentType = Data24.ModelContentTypes.CONTENT;
    this.content = rawContent;

    return this;
  }

  public loadXML(rawContent: string): this
  {
    this.contentType = Data24.ModelContentTypes.XML;

    if (XMLParser.validate(rawContent)) {
      this.content = XMLParser.parse(rawContent);
    }

    return this;
  }

  public loadJSON(rawContent: string): this
  {
    this.contentType = Data24.ModelContentTypes.JSON;
    this.content = JSON.parse(rawContent);

    return this;
  }

  /**
   * Data24 API의 응답 데이터가 유효한지 확인합니다.
   */
  protected isValidResponse(): boolean
  {
    if (typeof this.content == 'object' && 'response' in this.content) {
      if (!Object.values(Data24.ResponseError).includes(this.content.response.header.resultCode)) {
        return true;
      } else {
        throw new Error(`is invalid response (CODE: ${this.content.response.header.resultCode})`);
      }
    }

    throw new Error(`cannot parsing response data: ${JSON.stringify(this.content)}`);
  }


  public call(): Promise<string>
  {
    if (this.requestUri == null) {
      throw new Error(this.ERR_URI_NOT_SET);
    }

    const requestUriWithParams = this.getRequestUriWithParams();
    return super.get(requestUriWithParams);
  }

  public getRequestUriWithParams(): string
  {
    return `${this.requestUri}?${this.makeRequestParams()}`;
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
