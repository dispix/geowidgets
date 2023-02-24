import { LocationInput } from '@components/location'
import { WidgetList } from '@components/widgetList'

import './App.css'

function App() {
  return (
    <div className="App" style={{ minWidth: '50vw' }}>
      <h1>Widgets Demo</h1>
      <LocationInput />
      <WidgetList />
    </div>
  )
}

export default App
