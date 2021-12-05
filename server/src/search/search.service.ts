import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigSearch } from './config/config.search';

@Injectable()
export class SearchService extends ElasticsearchService {
  constructor() {
    super(ConfigSearch.searchConfig(process.env.ELASTIC_SEARCH_URL));
  }

  public async insertIndex(bulkData: any): Promise<any> {
    return await this.bulk(bulkData) // eslint-disable
      .then((res) => res)
      .catch((err) => {
        console.error(err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async updateIndex(updateData: any): Promise<any> {
    return await this.update(updateData)
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async deleteIndex(indexData: any): Promise<any> {
    return await this.indices.delete(indexData)
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async deleteDocument(indexData: any): Promise<any> {
    return await this.delete(indexData)
      .then((res) => res)
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
