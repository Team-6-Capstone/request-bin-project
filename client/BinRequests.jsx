import React, { useEffect, useState } from 'react'


import { Container, Box, Paper } from '@mui/material'
import { Button } from '@mui/material'

import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";


/*
*/
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function BinRequests({ requests }) {
  console.log("1", requests)
  // ensure here that requests are unique
  const ids = Array.from(new Set(requests.map(r => r._id)))
  // given this Set, find the unique requests
  const uniqueRequests = ids.map(id => {
    return requests.find(r => {
      return r._id === id
    })
  })

  requests = uniqueRequests
  requests.sort((a, b) => new Date(b.requestData.created) - new Date(a.requestData.created))
  console.log("2", requests)
  
  // debugger
  // 
  // const newRequests = 
  /*
  requests is an array
  requests[n]._id ()
  requests[n].requestData ---> a
    a.created ()
    a.ip ()
    a.path ()
    a.http_method ()
    a.protocol ()
    a.Content_type ()
    a.content_length
    -----
    a.rawBody (large string!!) <-----
  requests[n].items --> 
    b.form_post_parameters --> c
      c.obj
    b.headers --> c
      c.obj
  */
  return (
    <>
      <Container maxWidth="xl" sx={{
        backgroundColor: "#eeeee4",
        borderWidth: "2px",
        borderRadius: "10px",
        borderStyle: "solid",
        // pb: 2
      }}>
        {requests.map(r => {
          const a = r.requestData
          const b = r.items
          
          // <--- .form_post_parameters and .headers
          return (
            <Container
              key={r._id}
              sx={{
                pt: 1,
                pb: 1,
              }}
              maxWidth= "m"
            >
              <Container
                maxWidth= "m"
                sx={{
                  backgroundColor: "#eab676",
                  borderWidth: "2px",
                  borderRadius: "10px",
                  borderStyle: "solid",
                }}
              >
                Protocol: {`${a.protocol}`}
                <br></br>
                Content Type: {`${a.Content_type}`}
                <br></br>
                Size: {`${a.content_length} bytes`}
                <br></br>
                Method: {`${a.http_method} /`}
                <br></br>
                From: {a.ip}
                <br></br>
                Created: {a.created}
              </Container>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <Item>
                    Form/Post Parameters: {/*Look in to Typography Component*/}
                    <br></br>
                    {
                      // [[key, val], [...], ...]
                      Object.entries(b.form_post_parameters).map(
                        (keyValPair) => {
                          return (
                            <div key={JSON.stringify(keyValPair)}>
                              {`${keyValPair[0]}: ${keyValPair[1]}`}
                            </div>
                          );
                        }
                      )
                    }
                  </Item>
                </Grid>
                <Grid xs={6}>
                  <Item>
                    Headers:
                    <br></br>
                    {
                      Object.entries(b.headers).map(
                        (keyValPair) => {
                          return (
                            <div key={JSON.stringify(keyValPair)}>
                              {`${keyValPair[0]}: ${keyValPair[1]}`}
                            </div>
                          );
                        }
                      )
                    }
                  </Item>
                </Grid>
                <Grid xs={12}>
                  <Item>
                    Raw Body: 
                    {`"${a.rawBody.slice(0,250)}..."`}</Item>
                </Grid>
              </Grid>
            </Container>
          );
        })}
      </Container>
    </>
  )
}

export default BinRequests