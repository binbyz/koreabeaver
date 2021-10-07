import ElasticSearch from '@elastic/elasticsearch';
import { logger } from '../../config/winston';

export default class ElasticHandler
{
  protected client: ElasticSearch.Client;

  public constructor() {
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-connecting.html
    this.client = new ElasticSearch.Client({
      "node": `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
    });
  }

  /**
   * Send Ping
   */
  public async ping(): Promise<boolean> {
    const pong = await this.client.ping();

    return pong.body;
  }
}
