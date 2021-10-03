import ElasticSearch from 'elasticsearch';
import { logger } from '../../config/winston';

export default class ElasticHandler
{
  protected client: ElasticSearch.Client;

  public constructor() {
    this.client = new ElasticSearch.Client({
      "host": `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
      "log": "trace",
      "apiVersion": process.env.ELASTIC_API_VERSION
    });
  }

  /**
   * Send Ping
   */
  public ping(): void {
    this.client.ping({ "requestTimeout": 1000 }, error => {
      if (error) {
        logger.error(`[PING] ElasticSearch ping failed: ${error}`);
      } else {
        logger.info('[PING] ElasticSearch ping succeeded');
      }
    })
  }
}
