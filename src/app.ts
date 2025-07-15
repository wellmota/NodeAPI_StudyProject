import cookie from '@fastify/cookie'
import fastify from 'fastify'

import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify({
  logger: env.NODE_ENV === 'production',
  trustProxy: true,
})

// Global error handler
app.setErrorHandler(async (error, request, reply) => {
  app.log.error(error)

  if (env.NODE_ENV === 'production') {
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Something went wrong',
    })
  }

  return reply.status(500).send({
    error: error.name,
    message: error.message,
    stack: error.stack,
  })
})

app.register(cookie)

// Health check endpoint
app.get('/health', async () => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    database: env.DATABASE_CLIENT,
  }
})

// Root endpoint
app.get('/', async () => {
  return {
    message: 'Node.js API Study Project',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      transactions: '/transactions',
    },
  }
})

app.register(transactionsRoutes, {
  prefix: 'transactions',
})
