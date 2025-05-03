import React from 'react'
import { Routes , Route } from 'react-router-dom'
import GetStarted from './pages/GetStarted'
const App = () => {
  return (
    <>
     <Routes >
      <Route path='/login' element={<GetStarted />} />
     </Routes>
    </>
  )
}

export default App
