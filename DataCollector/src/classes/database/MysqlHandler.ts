import mysql from 'mysql2/promise';
import { logger } from '../../../config/winston';

type QueryType = 'insert' | 'select' | 'update' | 'delete';

export default class MysqlHandler<T>
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

  public async inserts(massive: Array<T>)
  {
    const connection = await MysqlHandler.getConnection();
    const query = this.makeQuery('insert', massive);

    console.log(query);

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

  private makeQuery(queryType: QueryType, datas: Array<T>): string
  {
    const queries: Array<string> = [];

    switch (queryType) {
      case 'insert':
        queries.push(
          `INSERT INTO \`${this.tableName}\`(${Object.keys(datas[0]).map(this.backQuotes).join(', ')})`
        );

        const values: Array<string> = Array.from('?'.repeat(Object.values(datas[0]).length));

        queries.push(
          `VALUES (${values.join(', ')})`
        );
        break;
      default:
    }

    queries.push(';');

    return queries.join(' ');
  }

  private backQuotes(value: string, index: number): string
  {
    return ('`' + value + '`');
  }
}
