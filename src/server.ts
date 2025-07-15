import { app } from './app'
import { env } from './env'

const startServer = async () => {
  try {
    const port = process.env.PORT || env.PORT
    console.log(`Starting server on port ${port}...`)
    console.log(`Environment: ${env.NODE_ENV}`)
    console.log(`Database: ${env.DATABASE_CLIENT}`)
    console.log(`Process PORT: ${process.env.PORT}`)
    console.log(`Env PORT: ${env.PORT}`)

    await app.listen({
      port: parseInt(port.toString()),
      host: '0.0.0.0',
    })

    console.log(`✅ Server is running on port ${port}`)
    console.log(`✅ Server bound to: 0.0.0.0:${port}`)
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
