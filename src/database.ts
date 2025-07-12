import { knex as setupKnex } from 'knex'

export const config = {
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
  useNullAsDefault: true,
}

const knex = setupKnex(config)
