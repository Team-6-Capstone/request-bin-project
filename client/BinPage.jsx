import React, { useEffect, useState, useRef } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { Button, Box } from '@mui/material'

import BinDetails from './BinDetails'
import BinRequests from './BinRequests'

import api from './api/api'

function BinPage() {
  const [askingInterval, setAskingInterval] = useState(null)
  const intervalEl = useRef(null)
  const { binKey } = useParams()
  const navigate = useNavigate()
  const [binDetails, setBinDetails] = useState({})
  const [requests, setRequests] = useState([])

  useEffect(() => {
    getAndSetBinDetails()

    // if (!askingInterval) {
    //   const myAskingInterval = setInterval(() => {
    //     getAndSetBinDetails()
    //   }, 5000) // 5000 sec live update
    //   console.log(myAskingInterval)
    //   setAskingInterval(myAskingInterval)
    // } else {
    //   setAskingInterval(null)
    // }
    // if (!intervalEl.current) {
    //   const myAskingInterval = setInterval(() => {
    //     getAndSetBinDetails()
    //   }, 2000) // 5000 sec live update
    //   // console.log(myAskingInterval)
    //   // setAskingInterval(myAskingInterval)
    //   console.log(intervalEl.current, myAskingInterval)
    //   intervalEl.current= myAskingInterval
    // } else {
    //   clearInterval(intervalEl.current)
    // }    
  }, [])

  const getAndSetBinDetails = () => {
    api.getBinDetails(binKey).then(result => {
      // here is where we would place the component states
      // console.log(result)
      const myBinDetails = result.binDetails
      const myRequests = result.requests
      // myRequests.sort((a, b) => new Date(b.requestData.created) - new Date(a.requestData.created))
      // debugger
      // console.log(myRequests.length)
      // debugger
      myBinDetails.requestCount = myRequests.length
      setBinDetails(myBinDetails)
      setRequests(myRequests)
    })
  }

  const onClickHome = () => {
    // console.log(askingInterval)
    // clearInterval(askingInterval)
    // console.log(intervalEl.current)
    // clearInterval(intervalEl.current)
    // intervalEl.current = null
    // setAskingInterval(null)
    navigate("/")
  }

  const onClickRefresh = () => {
    getAndSetBinDetails()
  }

  return (
    <div>
      <Button onClick={onClickHome}>Navigate Back Home</Button>
      <br></br>
      <h2>✨✨ Hello Cohort 2208 ✨✨ Try: {`https://binofrequests.athresher.com/target/${binKey}`}</h2>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 1
      }}>
        <Button variant='contained' onClick={onClickRefresh}>🙌🙌 Refresh 🙌🙌</Button>
      </Box>
      <BinDetails details={binDetails}/>
      <br></br>
      <BinRequests requests={requests}/>
    </div>
  )
}

export default BinPage