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

export namespace CircuitInterface
{
  export type BootFn = () => void;
  export type PrepareFn = () => Promise<void>;
  export type HandleFn = () => void;
  export type AlwaysFn = () => void;

  export interface Bodies extends IndexSignature
  {
    /**
     * step 1: boot
     *
     * Circuit를 실행하기 전 가장 첫 번째 논리 단위입니다.
     * `true`시 `prepare` 단계로 넘어갑니다.
     */
    boot: BootFn;
    /**
     * step 2: prepare
     *
     * `true`시 `handle` 단계로 넘어갑니다.
     */
    prepare: PrepareFn;
    /**
     * step 3: handle
     *
     * 실제 작업이 실행되는 논리 단위의 공간입니다.
     */
    handle: HandleFn;
    /**
     * Circuit 실행 후 항상 실행됩니다.
     */
    always: AlwaysFn;
  }
}

export namespace Collector
{
  export enum Types
  {
    DATA24_MDCIN = 1,
    APT_TRADE = 2,
  }
}

export namespace Data24
{
  export const API_MDCIN_HOST = 'http://apis.data.go.kr';
  export const API_MDCIN_URI = '/1471000/MdcinExaathrService01/getMdcinExaathrList01';

  export const API_APT_TRADE = 'http://openapi.molit.go.kr'
  export const API_APT_TRADE_URI = '/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev'

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

  export interface ModelPageCounter extends IndexSignature
  {
    totalPage: number;
    numOfRows: number;
    pageNo: number;
    totalCount: number;
  }
}
