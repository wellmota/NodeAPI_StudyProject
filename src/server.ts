import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Test Transaction',
      amount: 5000,
    })
    .returning('*')

  return transaction
})

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333')
})
