import http from 'http';
import https from 'https';
import { HttpMethods, Protocols } from '../../types';

export default class RequestHandler
{
  public request(method: HttpMethods, uri: string): Promise<string>
  {
    console.log(method, uri);
    const parsedUri = new URL(uri);
    const protocol: Protocols = <Protocols>parsedUri.protocol.toLowerCase();
    const request = protocol == 'http:' ? http : https;

    const params = {
      method,
      host: parsedUri.host,
      port: parsedUri.port || protocol == 'https:' ? 443 : 80,
    };

    return new Promise<string>((resolve, reject) => {
      const requested = request.request(params, response => {
        // rejected
        if (this.isNotValidStatusCode(response.statusCode)) {
          // console.log(response);
          return reject(new Error(`Status Code: ${response.statusCode}`));
        }

        const data: Buffer[] = [];

        response.on('data', chunk => {
          console.log(chunk.toString());
          data.push(chunk)
        });

        response.on('error', reject);

        // resolved
        response.on('end', () => resolve(
          Buffer.concat(data).toString()
        ));

        // TODO `postData`
        // https://stackoverflow.com/a/66536053/4188073
      });

      requested.end();
    });
  }

  private isNotValidStatusCode(statusCode: number | undefined): boolean
  {
    return (statusCode == undefined || statusCode < 200 || statusCode >= 300);
  }

  public get(uri: string): Promise<string>
  {
    return this.request('GET', uri);
  }

  public post(uri: string): Promise<string>
  {
    return this.request('POST', uri);
  }
}
