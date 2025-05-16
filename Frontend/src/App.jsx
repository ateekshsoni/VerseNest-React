import React from 'react'
import StartJourney from './pages/StartJourney'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/start-your-journey" element={<StartJourney />} />
      </Routes>
    </>
  )
}

export default App
