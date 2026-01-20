interface EnvConfig {
  API_URL: string
  APP_NAME: string
  IS_DEV: boolean
  IS_PROD: boolean
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key] as string | undefined
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    console.warn(`Environment variable ${key} is not defined`)
    return ''
  }
  return value
}

export const env: EnvConfig = {
  API_URL: getEnvVar('VITE_API_URL', 'http://localhost:3000/api'),
  APP_NAME: getEnvVar('VITE_APP_NAME', 'POC Virtual Professor'),
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
}
