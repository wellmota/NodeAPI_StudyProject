import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? { filename: env.DATABASE_CLIENT }
      : env.DATABASE_CLIENT,
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
