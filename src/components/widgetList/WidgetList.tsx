import Grid from '@mui/material/Grid'
import { FunctionComponent, ReactNode, useState } from 'react'

import {
  WidgetPlaceholder,
  optionIds,
  OptionId,
} from '@components/widgetPlaceholder'
import { WeatherWidget } from '@components/weatherWidget'
import { useLocation } from '@components/location'

const optionIdsToComponentMap: Record<OptionId, FunctionComponent> = {
  weather: WeatherWidget,
}

export type WidgetListProps = {}

export function WidgetList({}: WidgetListProps) {
  const [widgetList, setWidgetList] = useState<typeof optionIds>([])
  const { location } = useLocation()

  return location ? (
    <Grid
      container
      paddingY={2}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ width: '30vw' }}
    >
      {widgetList.map((el, index) => {
        const Component = optionIdsToComponentMap[el]

        return (
          <WidgetListGridItem key={index}>
            <Component />
          </WidgetListGridItem>
        )
      })}
      <WidgetListGridItem>
        <WidgetPlaceholder
          onWidgetSelect={(id) => setWidgetList((list) => [...list, id])}
        />
      </WidgetListGridItem>
    </Grid>
  ) : null
}

function WidgetListGridItem({ children }: { children: ReactNode }) {
  return (
    <Grid item xs={2} sm={4} md={4}>
      {children}
    </Grid>
  )
}
