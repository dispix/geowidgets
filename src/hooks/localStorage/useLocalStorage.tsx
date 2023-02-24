import { useEffect, useState } from 'react'

function get<T>(key: string, validate?: (val: unknown) => val is T) {
  const rawItem = localStorage.getItem(key)
  const parsedItem = rawItem && JSON.parse(rawItem)

  return validate ? (validate(parsedItem) ? parsedItem : null) : parsedItem
}

export function useLocalStorage<T>(
  key: string,
  defaultValue?: T,
  validate?: (val: unknown) => val is T,
) {
  const [value, setValue] = useState<T | null>(
    () => get(key, validate) ?? defaultValue,
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue] as const
}
