/**
 * HTTP Methods
 *
 * @link https://developer.mozilla.org/ko/docs/Web/HTTP/Methods
 */
export type HttpMethods =
  'GET' | 'HEAD' | 'POST' |
  'PUT' | 'DELETE' | 'CONNECT' |
  'OPTIONS' | 'TRACE' | 'PATCH';

export type Protocols = 'http:' | 'https:';

export interface IndexSignature
{
  [index: string]: any // index signature
}

export namespace Data24
{
  export const API_MDCIN_HOST = 'http://apis.data.go.kr';
  export const API_MDCIN_URI = '/1471000/MdcinExaathrService01/getMdcinExaathrList01';

  export enum ResponseError
  {
    APPLICATION_ERROR = 1,
    DB_ERROR,
    NO_DATA,
    HTTP_ERROR,
    SERVICE_TIMEOUT,
    INVALID_PARAMETERS = 10,
    NO_REQUIRED_PARAMETERS,
    API_CLOSED,
    SERVICE_DENINED = 20,
    REQUEST_EXCEEDED = 22,
    INVALID_KEY = 30,
    EXPIRED_KEY,
    INVALID_DOMAIN,
  }

  // ==================================================
  export interface RequestParams extends IndexSignature
  {
    numOfRows: number;
    pageNo: number;
    ServiceKey: string;
  }

  // ==================================================
  export interface Data24HandlerInterface
  {
    call: () => Promise<string>;
    setRequestUri: (requestUri: string) => void;
    setNumOfRows: (rows: number) => void;
    setPageNo: (page: number) => void;
  }

  // ==================================================
  export enum ModelContentTypes {
    CONTENT,
    XML,
    JSON,
  }

  export type ModelContents = ModelContentTypes;

  export interface ModelInterface
  {
    loadContent: (rawContent: string) => this;
    loadXML: (rawContent: string) => this;
    loadJSON: (rawContent: string) => this;
    throws: (error: Error) => void;
  }

  export interface ModelHandler
  {
    handle: () => void;
  }
}
