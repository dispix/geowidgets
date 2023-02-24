import { weatherService } from '@services/weather'
import { useQuery } from 'react-query'

export function useWeather(
  location: {
    coordinates: { latitude: number; longitude: number }
  } | null,
) {
  return useQuery(
    ['currentWeather', location?.coordinates] as const,
    ({ queryKey: [, coordinates] }) =>
      location && weatherService.getCurrentWeather(coordinates!),
    { enabled: !!location },
  )
}
