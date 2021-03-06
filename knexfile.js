module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './db/lambda.db3' },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './db/seeds' },
  },
};
