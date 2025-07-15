import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

export const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables!', _env.error.issues)
  console.error('Available env vars:', Object.keys(process.env))
  throw new Error('invalid environment variables!')
}

console.log('✅ Environment variables loaded successfully')
export const env = _env.data
