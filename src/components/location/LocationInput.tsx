import { Autocomplete, AutocompleteProps, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'

import { useLocationSuggestions } from '@hooks/geocode'
import { usePosition } from '@hooks/position'

import { updateLocationContext, useLocation } from './LocationProvider'

type AutoCompleteItem = {
  id: string
  label: string
}

export function LocationInput() {
  /**
   * using the browser's position
   */
  const [position, positionError] = usePosition()

  /**
   * using geocode service to get address suggestions
   */
  const [search, setSearch] = useState('')
  const { data, isLoading } = useLocationSuggestions(search, position?.coords)

  /**
   * reading/writing location to context
   */
  const { location } = useLocation()
  const updateContext = useContext(updateLocationContext)

  /**
   * autocomplete props
   */
  const options = (data?.items ?? [])
    .map(({ id, address }) =>
      address?.label ? { id, label: address.label } : null,
    )
    .filter((el): el is AutoCompleteItem => !!el)
  const errorLabel = positionError
    ? positionError.code === positionError.PERMISSION_DENIED
      ? 'Allow position access to use this field'
      : positionError.code === positionError.POSITION_UNAVAILABLE
      ? 'Position unavailable'
      : 'Error using device location'
    : null
  const handleLocationChange: AutocompleteProps<
    AutoCompleteItem,
    false,
    false,
    false
  >['onChange'] = (_, item) => {
    if (item) {
      const match = data?.items.find((el) => el.id === item?.id)
      if (match?.address) {
        updateContext({
          id: match.id,
          address: match.address.label,
          coordinates: {
            latitude: match.position.lat,
            longitude: match.position.lng,
          },
        })
      }
    } else {
      updateContext(null)
    }
  }

  return (
    <Autocomplete<{ id: string; label: string }>
      clearOnBlur={false}
      inputValue={search}
      loading={isLoading}
      onInputChange={(_, value) => setSearch(value)}
      disabled={!!positionError}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!positionError}
          label={positionError ? errorLabel : 'Address'}
        />
      )}
      options={options}
      filterOptions={(x) => x}
      value={location ? { id: location.id, label: location.address } : null}
      onChange={handleLocationChange}
    />
  )
}
