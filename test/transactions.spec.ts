import { randomUUID } from 'crypto'
// Set required environment variables for the test **before** importing the application code
process.env.DATABASE_URL = process.env.DATABASE_URL ?? './test.db'
process.env.NODE_ENV = 'test'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import request from 'supertest'
import { app } from '../src/app'
import { knex } from '../src/database'

describe('transactions routes', () => {
  beforeAll(async () => {
    // Run all pending migrations before the application is ready
    await knex.migrate.latest()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
    // Destroy the database connection after tests finish
    await knex.destroy()
  })

  it('should be able to create a new transaction', async () => {
    const sessionId = randomUUID()

    await request(app.server)
      .post('/transactions')
      .set('Cookie', [`sessionId=${sessionId}`])
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const sessionId = randomUUID()

    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .set('Cookie', [`sessionId=${sessionId}`])
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie') as string[]

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 5000,
      }),
    ])
  })

  it('should to get a specific transaction', async () => {
    const sessionId = randomUUID()

    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .set('Cookie', [`sessionId=${sessionId}`])
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie') as string[]

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionsResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionsResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New Transaction',
        amount: 5000,
      })
    )
  })

  it('should be able to get the summary', async () => {
    const sessionId = randomUUID()

    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .set('Cookie', [`sessionId=${sessionId}`])
      .send({
        title: 'Credit Transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie') as string[]

    await request(app.server)
      .post('/transactions')
      .set('Cookie', [`sessionId=${sessionId}`])
      .send({
        title: 'Debit Transaction',
        amount: 2000,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})
