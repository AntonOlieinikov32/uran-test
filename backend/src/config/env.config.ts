import { config } from 'dotenv'
import { resolve } from 'path'

interface EnvConfig {
  BACKEND_PORT: number
  MONGODB_URI: string
}

export function loadEnv(): EnvConfig {
  config({
    path: resolve(__dirname, '../../../.env'),
  })

  // Validate required environment variables
  const requiredEnvVars = ['PORT', 'MONGODB_URI'] as const

  const env: EnvConfig = {
    BACKEND_PORT: parseInt(process.env.PORT || '3001', 10),
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager',
  }

  // Validate that all required environment variables are set
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.warn(`Warning: ${envVar} is not set in environment variables`)
    }
  }

  return env
}

// Export the loaded environment configuration
export const env = loadEnv()
