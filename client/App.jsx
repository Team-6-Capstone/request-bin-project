import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'

import Home from './Home'
import BinPage from './BinPage'

function App() {
  // const navigate = useNavigate()


  return (
    <div>
      {/* <Button 
        variant="contained" 
        color="success" 
        onClick={() => {
          navigate("/")
        }}>
        Go Home :D
      </Button> */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/page/:binKey" element={<BinPage />}/>
      </Routes>
    </div>
  )
}

export default App