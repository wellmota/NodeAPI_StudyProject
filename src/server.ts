import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`Server is running on port ${env.PORT}`)
    console.log(`Environment: ${env.NODE_ENV}`)
    console.log(`Database: ${env.DATABASE_CLIENT}`)
  })
  .catch((error) => {
    console.error('Failed to start server:', error)
    process.exit(1)
  })
