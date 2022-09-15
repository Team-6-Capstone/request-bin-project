import axios from 'axios'

const PORT = 3003 // subject to change <-- json mock db 
const PATH = 'http://localhost:'

let counter = 0
const ary = [
  {
    binKey: "c87bd52a9ca77a7743fd89340ad3c8d5ac6f3aad", 
    createdTime: "2022-09-14 23:53:03.771056"
  },
  {
    binKey: "91678d6cd8e0357adae0f1c63be235336c8310c0",
    createdTime:"2022-09-14 23:53:03.771056"
  },
  {
    binKey: "5ec9e769ccfb4e5411bbdd1541002fe2e2e2b3c6",
    createdTime:"2022-09-15 00:19:12.919178"
  }
]

// this is for testing
function testCreateBin() {
  return new Promise((resolve, _) => {
    resolve(ary[counter])
  })
  .then(result => {
    insertToLocalStorage(result) // <--- helper

    counter += 1
    if (counter > ary.length) {
      localStorage.setItem('bins', JSON.stringify([]))
      counter = 0
      return []
    }

    return result
  })
  .catch(err => console.error(err))
}

function createBin() {
  return axios.post(PATH + PORT + '/create')
  .then(result => {
    insertToLocalStorage(result) // <--- helper
    return result
  })
  .catch(err => console.error(err))
}

function getBinsFromLocalStorage() {
  const bins = JSON.parse(localStorage.getItem('bins'))
  return bins
}

async function getBinFromAPI() {
  let binKeys = JSON.parse(localStorage.getItem('bins'))
  if (!binKeys) return;
  
  // [{}, {}, ...]
  const promises = binKeys.map(b => {
    const bKey = b.binKey
    return axios.get(PATH + PORT + '/' + bKey)
  })

  const values = (await Promise.allSettled(promises))
    .map(pVal => pVal.value.data)

  return values
  
  // return axios.get(PATH + PORT + '/' + binKey)
  //   .then(result => console.log(result.data))
}

export default {
  createBin,
  getBinFromAPI,
  getBinsFromLocalStorage,
  testCreateBin
}

function insertToLocalStorage(result) {
  const bins = JSON.parse(localStorage.getItem('bins')) // [{}, {}]
  if (!bins) { // <--- case if no bins yet
    const ary = [result]
    localStorage.setItem('bins', JSON.stringify(ary))
  } else { // case if there are already bins :D 
    bins.push(result)
    localStorage.setItem('bins', JSON.stringify(bins))
  }
}