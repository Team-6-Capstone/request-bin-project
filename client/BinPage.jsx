import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import BinDetails from './BinDetails'
import BinRequests from './BinRequests'

import api from './api/api'

function BinPage() {
  const { binKey } = useParams()
  const [binDetails, setBinDetails] = useState({})
  const [requests, setRequests] = useState([])

  useEffect(() => {
    api.getBinDetails(binKey).then(result => {
      // here is where we would place the component states
      // console.log(result)
      const myBinDetails = result.binDetails
      const myRequests = result.requests
      console.log(myRequests.length)
      // debugger
      setBinDetails(myBinDetails)
      setRequests(myRequests)
    })
  }, [])

  return (
    <div>
      <h1>Hello Cohort 2208 {`<3`} {binKey}</h1>
      <BinDetails details={binDetails}/>
      <br></br>
      <BinRequests requests={requests}/>
    </div>
  )
}

export default BinPage