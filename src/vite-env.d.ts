/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  readonly VITE_HERE_API_KEY: string
  readonly VITE_OPEN_WEATHER_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
