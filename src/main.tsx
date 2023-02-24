import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'

import App from './App'
import './index.css'
import { LocationProvider } from './components/location'

const queryClient = new QueryClient()

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <LocationProvider>
            <App />
          </LocationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
