import { expect, test } from 'vitest'

test('user can create new transactions', () => {
  //make the http request

  const responseStatusCode = 201

  expect(responseStatusCode).toEqual(201)
})
