import http from 'http';
import https from 'https';
import { HttpMethods, Protocols } from '../../types';
import { logger } from '../../config/winston';

export default class RequestHandler
{
  public request(method: HttpMethods, uri: string): Promise<string>
  {
    const parsedUri = new URL(uri);
    const protocol: Protocols = <Protocols>parsedUri.protocol.toLowerCase();
    const request = protocol == 'http:' ? http : https;

    const params = {
      method,
      hostname: parsedUri.hostname,
      path: parsedUri.pathname + parsedUri.search,
      port: parsedUri.port || protocol == 'https:' ? 443 : 80,
    };

    logger.http(`Http Request: ${JSON.stringify(params)}`);

    return new Promise<string>((resolve, reject) => {
      const requested = request.request(params, response => {
        // rejected
        if (this.isNotValidStatusCode(response.statusCode)) {
          logger.error(`Status Code: ${response.statusCode}: ${JSON.stringify(params)}`);
          return reject(new Error(`Status Code: ${response.statusCode}`));
        }

        const data: Buffer[] = [];

        response.on('data', chunk => {
          data.push(chunk)
        });

        response.on('error', reject);

        // resolved
        response.on('end', () => resolve(Buffer.concat(data).toString()));

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
