interface EnvConfig {
  BACKEND_PORT: number
  MONGODB_URI: string
}

export function loadEnv(): EnvConfig {
  // No need to load .env file since we're using environment variables from docker-compose
  const env: EnvConfig = {
    BACKEND_PORT: parseInt(process.env.PORT || '3001', 10),
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager',
  }

  return env
}

// Export the loaded environment configuration
export const env = loadEnv()
