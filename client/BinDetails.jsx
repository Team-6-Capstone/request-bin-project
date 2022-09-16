import React, { useEffect, useState } from 'react'
import { Container } from "@mui/material";

/*
{"details":{
  "binkey":"0oeVOUcVqltlAIeEyiqbDBJyb",
  "last_accessed":"2022-09-16T03:30:10.985Z",
  "created_at":"2022-09-16T03:24:02.153Z"}
}
*/

function BinDetails(props) {
  let binkey = props.details.binkey;
  let lastAccessed = props.details.last_accessed;
  let createdAt = props.details.created_at;
  let count = props.details.requestCount

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#eeeee4",
          borderWidth: "2px",
          borderRadius: "10px",
          borderStyle: "solid",
        }}
      >
        <table>
          <tr>
            <th>binkey</th>
            <td>{binkey}</td>
          </tr>
          <tr>
            <th>lastAccessed</th>
            <td>{lastAccessed}</td>
          </tr>
          <tr>
            <th>createdAt</th>
            <td>{createdAt}</td>
          </tr>
          <tr>
            <th>request count</th>
            <td>{count || 0}</td>
          </tr>          
        </table>
      </Container>
    </>
  );
}

export default BinDetails