import { useState, useEffect } from 'react'

/**
 * reading browser position for refining autocomplete suggestions
 * @returns browser's latitude and longitude
 */
export function usePosition() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null)
  const [error, setError] = useState<GeolocationPositionError | null>(null)

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(setPosition, setError)

    return () => navigator.geolocation.clearWatch(id)
  }, [])

  return [position, error] as const
}
