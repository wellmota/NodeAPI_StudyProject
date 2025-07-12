import { Knex, knex as setupKnex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './db/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
  pool: {
    afterCreate: (conn: any, cb: Function) => {
      conn.run('PRAGMA foreign_keys = ON', cb)
    },
  },
}

const knex = setupKnex(config)

export { knex }
