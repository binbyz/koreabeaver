import http from 'http';
import https from 'https';
import { HttpMethods, Protocols } from '../../types';

export default class RequestHandler
{
  public async request(method: HttpMethods, uri: string): Promise<string>
  {
    const parsedUri = new URL(uri);
    const protocol: Protocols = <Protocols>parsedUri.protocol.toLowerCase();
    const request = protocol == 'http' ? http : https;

    const params = {
      method,
      host: parsedUri.host,
      port: parsedUri.port || protocol == 'https' ? 443 : 80,
    };

    return new Promise<string>((resolve, reject) => {
      request.request(params, response => {
        // rejected
        if (this.isNotValidStatusCode(response.statusCode)) {
          return reject(new Error(`Status Code: ${response.statusCode}`));
        }

        let data: Buffer[] = [];

        response.on('data', chunk => data.push(chunk));
        response.on('error', reject)

        // resolved
        response.on('end', () => resolve(
          Buffer.concat(data).toString()
        ))

        // TODO `postData`
        // https://stackoverflow.com/a/66536053/4188073
      })
    });
  }

  private isNotValidStatusCode(statusCode: number | undefined): boolean
  {
    return (statusCode == undefined || statusCode < 200 || statusCode >= 300);
  }

  public async get(uri: string): Promise<string>
  {
    return this.request('GET', uri);
  }

  public async post(uri: string): Promise<string>
  {
    return this.request('POST', uri);
  }
}
