import React, { useEffect, useState } from 'react'

import api from './api/api'

import { Button } from '@mui/material'

function App() {
  const [numBins, setNumBins] = useState(JSON.parse(localStorage.getItem('bins')) ? JSON.parse(localStorage.getItem('bins')).length : 0)
  const [info, setInfo]= useState([])

  useEffect(() => {
    api.getBinsFromLocalStorage()
  }, [numBins])

  const onClickHandler = async () => {
    await api.testCreateBin() // {binKey, createdTime}
    setNumBins(JSON.parse(localStorage.getItem('bins')).length)

    const availableBins = await api.getBinsFromLocalStorage()
    console.log(availableBins)
    setInfo(availableBins)
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
      <ul>
        {info.map(i => {
          return (
            <li key={i.binKey}>
              {`${i.binKey}: ${i.createdTime}`}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App