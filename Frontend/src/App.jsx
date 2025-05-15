import React from 'react'
import { Routes , Route } from 'react-router-dom'
import StartJourney from './pages/StartJourney'
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/start-journey' element={<StartJourney />} />
    </Routes>
    </>
  )
}

export default App
