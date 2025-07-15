import { app } from './app'
import { env } from './env'

const startServer = async () => {
  try {
    // Render.com provides PORT environment variable
    const port = process.env.PORT ? parseInt(process.env.PORT) : env.PORT
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'

    console.log(`🚀 Starting server...`)
    console.log(`📊 Environment: ${env.NODE_ENV}`)
    console.log(`💾 Database: ${env.DATABASE_CLIENT}`)
    console.log(`🔌 Port: ${port}`)
    console.log(`🌐 Host: ${host}`)

    await app.listen({
      port: port,
      host: host,
    })

    console.log(`✅ Server is running on ${host}:${port}`)
    console.log(`🔗 Health check: http://${host}:${port}/health`)
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      console.error('Stack trace:', error.stack)
    }
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...')
  await app.close()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully...')
  await app.close()
  process.exit(0)
})

startServer()
