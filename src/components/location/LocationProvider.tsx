import { useLocalStorage } from '@hooks/localStorage'
import { createContext, ReactNode, useContext } from 'react'

type LocationContext = {
  location: Location | null
}

type Location = {
  id: string
  coordinates: { latitude: number; longitude: number }
  address: string
}

const locationContext = createContext<LocationContext | null>(null)

export function useLocation() {
  const context = useContext(locationContext)

  if (!context) {
    throw new Error('useLocation used outside of LocationProvider')
  }

  return context
}

export type LocationProviderProps = {
  children: ReactNode
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [context, setContext] = useLocalStorage<LocationContext>('location', {
    location: null,
  })

  return (
    <locationContext.Provider value={context}>
      <updateLocationContext.Provider
        value={(location) => setContext({ location })}
      >
        {children}
      </updateLocationContext.Provider>
    </locationContext.Provider>
  )
}

// exporting for internal use only
export const updateLocationContext = createContext<
  (location: Location | null) => void
>(() => {})
