import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import api from './api/api'

import { Button, Box } from '@mui/material'

function Home() {
  const navigate = useNavigate()

  const myBins = JSON.parse(localStorage.getItem('bins'))
  const [numBins, setNumBins] = useState(myBins ? myBins.length : 0)
  const [info, setInfo]= useState(myBins ? myBins : [])

  useEffect(() => {
    api.getBinsFromLocalStorage()
  }, [numBins])

  const onClickHandler = async () => {
    // await api.testCreateBin() // {binKey, createdTime}
    await api.createBin()
    setNumBins(JSON.parse(localStorage.getItem('bins')).length)

    const availableBins = await api.getBinsFromLocalStorage()
    console.log(availableBins)
    setInfo(availableBins)
  }

  const onClickHandlerBin = async (binKey) => {
    // console.log(binKey)
    navigate(`/page/${binKey}`)
  }

  return (
    <>
      <h1>🥳😭🤔 Request Bin Clone 🤔😭🥳</h1>
      <Box sx={{pl: 5}}>
        <Button 
          variant="contained" 
          onClick={onClickHandler}
        >
          + Create RequestBin
        </Button>
      </Box>
      <ul>
        {info.map(i => {
          return (
            <li key={i.binKey}>
              <Button href="#" 
                onClick={() => {
                  onClickHandlerBin(i.binKey)
                }}>
                {`${i.binKey}: ${i.createdTime}`}
              </Button>
              
            </li>
          )
        })}
      </ul>   
    </> 
  )
}

export default Home