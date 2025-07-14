import { randomUUID } from 'crypto'
import { afterAll, beforeAll, test } from 'vitest'

import request from 'supertest'
import { app } from '../src/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test('user can create new transactions', async () => {
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
