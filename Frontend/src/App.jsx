import React from 'react'
import StartJourney from './pages/StartJourney'

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
