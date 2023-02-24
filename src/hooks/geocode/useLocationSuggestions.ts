import { useQuery } from 'react-query'

import { GeocodeService } from '@services/geocode'

export function useLocationSuggestions(
  search: string,
  position?: { latitude: number; longitude: number } | null,
) {
  return useQuery(
    ['location-search', search, position] as const,
    ({ queryKey: [, query] }) =>
      position && GeocodeService.autosuggest(query, position),
    {
      enabled: !!search && !!position,
      keepPreviousData: true,
      staleTime: Infinity,
    },
  )
}
