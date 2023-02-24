import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'

import { useLocation } from '@components/location'
import { WidgetCard } from '@components/widgetCard'
import { GetCurrentWeatherResponse } from '@services/weather'
import { useWeather } from '@hooks/weather'

export function WeatherWidget() {
  const { location } = useLocation()
  const { data: weather, error } = useWeather(location)

  return (
    <WidgetCard>
      {location ? null : (
        <Typography>Select a location to get the weather</Typography>
      )}
      {error ? <Typography>Error fetching data</Typography> : null}
      {weather ? <WeatherWidgetContent weather={weather} /> : null}
    </WidgetCard>
  )
}

type WeatherWidgetContentProps = {
  weather: GetCurrentWeatherResponse
}

function WeatherWidgetContent({ weather }: WeatherWidgetContentProps) {
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h6" textAlign="left">
          {weather.weather[0].main}
        </Typography>
        <Typography variant="subtitle1" textAlign="left">
          {weather.weather[0].description}
        </Typography>
        <Typography>Temperature: {weather.main.temp}°C</Typography>
      </Grid>
    </Grid>
  )
}
