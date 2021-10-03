import { IndexSignature } from '../../types';
import MysqlEloquent from 'mysql-eloquent';

/**
 * `circuit`를 구분지어주는(types) 모음
 */
export enum CircuitTypes {
  DATA24_MDCIN = 1, // 의약행정처분 circuit
  APT_TRADE = 2, // 아파트거래 circuit
  MDCIN_CONVERTER = 3, // 의약행정처분 converter circuit
}

export interface CrawlerHistoryItem extends IndexSignature
{
  "type": CircuitTypes;
  "extra_data": ExtraDataItem;
}

export interface ExtraDataItem extends IndexSignature
{
  "last_page": number | AptLastPageItem[],
  "last_updated": string,
}

export interface AptLastPageItem extends IndexSignature
{
  "date": string;
  "city_code"?: string;
  "page": number;
}

export interface ConverterExtraData extends IndexSignature
{
  "raw_table": string;
  "last_convert_id": number;
  "last_updated": string;
}

export default class CircuitModel extends MysqlEloquent<CrawlerHistoryItem>
{
  protected databaseName: string = 'beaver';
  protected primaryKey: string = 'id';
  protected tableName: string = 'collector_history';

  public constructor()
  {
    super();
  }
}
