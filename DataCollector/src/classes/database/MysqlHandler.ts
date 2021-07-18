import mysql from 'mysql2/promise';

export default class MysqlHandler<T>
{
  private static connection: mysql.Connection | undefined = undefined;
  protected tableName: string = '';
  protected primaryKey: string = 'id';
  protected fields: T[] = [];

  public constructor()
  {
    this.connect();
  }

  private async connect()
  {
    // <Connection Pool>
    // https://www.npmjs.com/package/mysql2#using-connection-pools
    // const connection = mysql.createPool({
    //   "host": process.env.MYSQL_HOST,
    //   "user": process.env.MYSQL_USER,
    //   "password": process.env.MYSQL_PASSWORD,
    //   "database": process.env.MYSQL_DB_NAME,
    //   "waitForConnections": true,
    //   "connectTimeout": 10,
    //   "queueLimit": 0,
    // });

    // <Connection Promise>
    // https://www.npmjs.com/package/mysql2#using-promise-wrapper
    MysqlHandler.connection = MysqlHandler.connection || await mysql.createConnection({
      "host": process.env.MYSQL_HOST,
      "user": process.env.MYSQL_USER,
      "password": process.env.MYSQL_PASSWORD,
      "database": process.env.MYSQL_DB_NAME,
    });
  }

  public getConnection(): mysql.Connection | undefined
  {
    return MysqlHandler.connection;
  }
}
