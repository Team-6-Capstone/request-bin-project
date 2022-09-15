import React, { useEffect } from 'react'

import api from './api/api'

import { Button } from '@mui/material'
function App() {

  useEffect(() => {
    api.getBin("5ec9e769ccfb4e5411bbdd1541002fe2e2e2b3c6")
  }, [])

  const onClickHandler = async () => {
    const info = await api.createBin()
    console.log(info)
  }

  return (
    <div>
      <h1>Request Bin Clone</h1>
      <Button 
        variant="contained" 
        onClick={onClickHandler}
      >
        + Create RequestBin
      </Button>
    </div>
  )
}

export default App