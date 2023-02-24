const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY

/**
 * Fetches the weather for the given location
 * @param params location parameters
 * @returns current weather for given location
 */
function getCurrentWeather({ latitude, longitude }: GetCurrentWeatherParams) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`,
  ).then<GetCurrentWeatherResponse>((res) => res.json())
}
export type GetCurrentWeatherParams = {
  latitude: number
  longitude: number
}
export type GetCurrentWeatherResponse = {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  base: 'stations'
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust: number
  }
  rain: {
    '1h': number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export class weatherService {
  static getCurrentWeather = getCurrentWeather
}
