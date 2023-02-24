import H from '@here/maps-api-for-javascript'

const searchService = new H.service.Platform({
  apikey: import.meta.env.VITE_HERE_API_KEY,
}).getSearchService()

/**
 * General purpose types
 */
export type LatLng = {
  latitude: number
  longitude: number
}

/**
 * Offers address suggestion based on partial address text search
 * @param query address to search for
 * @param position current position for suggestion refinement
 */
function autosuggest(
  query: string,
  { latitude, longitude }: LatLng,
): Promise<AutosuggestResponse> {
  return new Promise((res, rej) =>
    searchService.autosuggest(
      { q: query, limit: 5, in: `circle:${latitude},${longitude};r=10000` },
      // @ts-ignore
      (r: AutosuggestResponse) => res(r),
      rej,
    ),
  )
}

export type AutosuggestResponse = { items: AutosuggestItem[] }

export type AutosuggestItem = {
  title: string
  id: string
  address?: { label: string }
  position: { lat: number; lng: number }
  highlights: {
    title: [{ start: number; end: number }, { start: number; end: number }]
    address: {
      label: [{ start: number; end: number }, { start: number; end: number }]
    }
  }
}

export class GeocodeService {
  static autosuggest = autosuggest
}
