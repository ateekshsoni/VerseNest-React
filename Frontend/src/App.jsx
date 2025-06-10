import React from 'react'
import StartJourney from './pages/StartJourney'
import { Route, Routes } from 'react-router-dom'
import CommingSoonPage from './Pages/ComingSoonPage'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CommingSoonPage/>} />
        <Route path="/start-your-journey" element={<StartJourney />} />
      </Routes>
    </>
  )
}

export default App
