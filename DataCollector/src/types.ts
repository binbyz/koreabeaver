/**
 * HTTP Methods
 *
 * @link https://developer.mozilla.org/ko/docs/Web/HTTP/Methods
 */
export type HttpMethods =
  'GET' | 'HEAD' | 'POST' |
  'PUT' | 'DELETE' | 'CONNECT' |
  'OPTIONS' | 'TRACE' | 'PATCH';

export type Protocols = 'http' | 'https';

export namespace Data24
{
  export const API_MDCIN_HOST = 'http://apis.data.go.kr';
  export const API_MDCIN_URI = '/1471000/MdcinExaathrService01/getMdcinExaathrList01';

  export interface RequestParams
  {
    rows: number;
    page: number;
  };
}
