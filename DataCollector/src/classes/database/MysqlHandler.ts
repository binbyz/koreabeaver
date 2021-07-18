import mysql from 'mysql2';

export default class MysqlHandler<T>
{
  private connection: mysql.Pool;
  protected tableName: string = '';
  protected primaryKey: string = 'id';
  protected fields: T[] = [];

  public constructor()
  {
    // <Connection Pool>
    // https://www.npmjs.com/package/mysql2#using-connection-pools
    this.connection = mysql.createPool({
      "host": process.env.MYSQL_HOST,
      "user": process.env.MYSQL_USER,
      "password": process.env.MYSQL_PASSWORD,
      "database": process.env.MYSQL_DB_NAME,
      "waitForConnections": true,
      "connectTimeout": 10,
      "queueLimit": 0,
    });
  }

  public getConnection(): mysql.Pool
  {
    return this.connection;
  }

  public getTableName(): string
  {
    return this.tableName;
  }
}
