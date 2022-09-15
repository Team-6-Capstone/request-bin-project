import React, { useEffect } from 'react'

import api from './api/api'

import { Button } from '@mui/material'
function App() {

  useEffect(() => {
    api.getBin()
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