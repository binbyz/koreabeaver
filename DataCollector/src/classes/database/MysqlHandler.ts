import mysql from 'mysql2/promise';
import { IndexSignature } from '../../types';
import { logger } from '../../../config/winston';
import { isUndefined } from '../../lib/slim';

type QueryType = 'insert' | 'select' | 'update' | 'delete' | 'upsert';

/**
 * `boolean` is EXISTS
 */
type whereValueCondition = string | number | boolean;

const CONNECTION_TIMEOUT = 10;
const DEFAULT_LIMIT = 2000;

export default class MysqlHandler<T extends IndexSignature>
{
  private static pool: mysql.Pool;

  private whereCondition: Map<string, whereValueCondition> = new Map<string, whereValueCondition>();
  private fields: string[] = [];
  private _offset: number = 0;
  private _limit: number = DEFAULT_LIMIT;

  // TODO implements `database name` property

  protected tableName: string = '';
  protected primaryKey: string = 'id';

  public constructor()
  {
    MysqlHandler.connect();
  }

  private static connect(): void
  {
    // <Connection Pool>
    // https://www.npmjs.com/package/mysql2#using-connection-pools
    MysqlHandler.pool = mysql.createPool({
      "host": process.env.MYSQL_HOST,
      "user": process.env.MYSQL_USER,
      "password": process.env.MYSQL_PASSWORD,
      "database": process.env.MYSQL_DB_NAME,
      "waitForConnections": true,
      "connectTimeout": CONNECTION_TIMEOUT,
      "queueLimit": 0,
    });

    // <Connection Promise>
    // https://www.npmjs.com/package/mysql2#using-promise-wrapper
    // MysqlHandler.connection = MysqlHandler.connection || await mysql.createConnection({
    //   "host": process.env.MYSQL_HOST,
    //   "user": process.env.MYSQL_USER,
    //   "password": process.env.MYSQL_PASSWORD,
    //   "database": process.env.MYSQL_DB_NAME,
    // });
  }

  public static async getConnection(): Promise<mysql.PoolConnection>
  {
    if (!MysqlHandler.pool) {
      MysqlHandler.connect();
    }

    const connection = await MysqlHandler.pool.getConnection();

    return connection;
  }

  /**
   * Inserts
   * @param massive
   */
  public async inserts(massive: Array<T>)
  {
    const connection = await MysqlHandler.getConnection();
    const query = this.makeInsertQuery('insert', massive);

    try {
      await connection.beginTransaction();

      // <Prepared Statement>
      // https://www.npmjs.com/package/mysql2#using-prepared-statements
      massive.forEach(async row => {
        // If you execute same statement again, it will be picked from a LRU cache
        // which will save query preparation time and give better performance
        await connection.execute(query, Object.values(row));
      });

      await connection.commit();

      logger.info(`Total ${massive.length} items was inserted.`);
    } catch (err) {
      await connection.rollback();

      logger.error(err.toString());
    }

    connection.release();
  }

  /**
   * select
   * @param fields string | string[]
   * @returns
   */
  public select(fields: string | string[]): this
  {
    if (!Array.isArray(fields)) { // is string
      fields = fields.split(',').map(v => v.trim());
    }

    this.fields = fields;

    return this;
  }

  /**
   * where
   * @param key string
   * @param condition whereValueCondition
   * @returns this
   */
  public where(key: string, condition: whereValueCondition): this
  {
    this.whereCondition.set(key, condition);

    return this;
  }

  /**
   * set offset
   * @param offset number
   * @returns
   */
  public offset(offset: number): this
  {
    this._offset = Math.abs(offset);

    return this;
  }

  /**
   * set limit
   * @param limit number
   * @returns
   */
  public limit(limit: number): this
  {
    this._limit = Math.abs(limit);

    return this;
  }

  /**
   * 모든 `whereCondition`을 초기화합니다.
   * @returns this
   */
  public clear(): this
  {
    this.whereCondition.clear();

    return this;
  }

  public get(): void
  {
    const query: string = this.makeSelectQuery();
    console.log(query);
  }

  /**
   * Upserts
   * @param massive
   * @param key
   * @param options
   */
  public async upserts(massive: Array<T>, key: string, options: Array<string>)
  {
    const connection = await MysqlHandler.getConnection();
    const query = this.makeInsertQuery('upsert', massive, key, options);

    try {
      await connection.beginTransaction();

      // <Prepared Statement>
      massive.forEach(async row => {
        const values: Array<string> = Object.values(row);

        // ON DUPLICATE KEY UPDATE `key`={VALUES}
        values.push(row[key]);

        // After `ON DUPLICATE KEY UPDATE `key`={VALUES}, {...}`
        options.forEach(field => values.push(row[field]));

        await connection.execute(query, values);
      });

      await connection.commit();

      logger.info(`Total ${massive.length} items was upserted.`);
    } catch (err) {
      await connection.rollback();

      logger.error(err.toString());
    }

  }

  /**
   * makeInsertQuery
   * @param queryType
   * @param datas
   * @param key
   * @param options
   * @returns string
   */
  private makeInsertQuery(
    queryType: QueryType,
    datas: Array<T>,
    key: string | undefined = undefined,
    options: Array<string> | undefined = undefined,
  ): string
  {
    const queries: Array<string> = [];

    switch (queryType) {
      case 'insert':
      case 'upsert':
        queries.push(`INSERT INTO \`${this.tableName}\`(${Object.keys(datas[0]).map(this.backQuotes).join(', ')})`);

        const values: Array<string> = Array.from('?'.repeat(Object.values(datas[0]).length));

        queries.push(
          `VALUES (${values.join(', ')})`
        );

        if (queryType == 'upsert' && !isUndefined(key) && !isUndefined(options)) {
          queries.push(`ON DUPLICATE KEY UPDATE \`${key}\`=?, ${this.makeUpdateParts(<Array<string>>options)}`);
        }
        break;
      default:
    }

    return queries.join(' ');
  }

  private makeSelectQuery(): string
  {
    const queries: Array<string> = [];

    queries.push(`SELECT ${this.fields.length ? this.fields.map(this.backQuotes).join(', ') : '*'}`);
    queries.push(`FROM \`${this.tableName}\``);
    queries.push('WHERE');

    if (!this.whereCondition.size) {
      queries.push('1');
    } else {
      const conditions: string[] = [];

      this.whereCondition.forEach((value: whereValueCondition, key: string) => {
        switch (typeof value) {
          case 'string':
          case 'number':
            conditions.push(`\`${key}\`=?`);
            break;
          case 'boolean':
            conditions.push(`\`${key}\` IS ${value ? 'EXISTS' : 'NOT EXISTS'}`);
            break;
          default:
        }
      });

      queries.push(conditions.join(' AND '));
    }

    // offset
    queries.push(`LIMIT ${this._limit} OFFSET ${this._offset}`);

    return queries.join(' ');
  }

  /**
   * makeUpdateParts
   * @param options
   * @returns string
   */
  private makeUpdateParts(options: Array<string>): string
  {
    return options.map(this.backQuotes).map(value => value + '=?').join(', ');
  }

  /**
   * backQuotes
   * @param value
   * @param index
   * @returns string
   */
  private backQuotes(value: string, index: number): string
  {
    return ('`' + value + '`');
  }
}
