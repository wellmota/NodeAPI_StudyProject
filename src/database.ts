import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? { filename: env.DATABASE_URL }
      : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
  pool: {
    afterCreate: (conn: any, cb: Function) => {
      if (env.DATABASE_CLIENT === 'sqlite') {
        conn.run('PRAGMA foreign_keys = ON', cb)
      } else {
        cb()
      }
    },
  },
}

const knex = setupKnex(config)

// Test database connection
knex
  .raw('SELECT 1')
  .then(() => {
    console.log('Database connection successful')
  })
  .catch((error) => {
    console.error('Database connection failed:', error)
  })

export { knex }
