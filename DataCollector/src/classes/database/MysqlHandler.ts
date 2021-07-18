import mysql from 'mysql2/promise';
import { IndexSignature } from '../../types';
import { logger } from '../../../config/winston';
import { isUndefined } from '../../lib/slim';

type QueryType = 'insert' | 'select' | 'update' | 'delete' | 'upsert';

export default class MysqlHandler<T extends IndexSignature>
{
  private static pool: mysql.Pool;
  protected tableName: string = '';
  protected primaryKey: string = 'id';
  protected fields: T[] = [];

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
      "connectTimeout": 10,
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
    const query = this.makeQuery('insert', massive);

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
   * Upserts
   * @param massive
   * @param key
   * @param options
   */
  public async upserts(massive: Array<T>, key: string, options: Array<string>)
  {
    const connection = await MysqlHandler.getConnection();
    const query = this.makeQuery('upsert', massive, key, options);

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
   * makeQuery
   * @param queryType
   * @param datas
   * @param key
   * @param options
   * @returns string
   */
  private makeQuery(
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
