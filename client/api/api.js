import axios from 'axios'

const PORT = 3003 // subject to change <-- json mock db 
const PATH = 'http://localhost:'

function createBin() {
  // return axios.post(PATH + PORT + '/create')
  //   .then(result => result.data)
  return new Promise((resolve, _) => {
    resolve({
      binKey: '5ec9e769ccfb4e5411bbdd1541002fe2e2e2b3c6',
      createdTime: 1662756747265
    })
  })
  .then(result => {
    const bins = JSON.parse(localStorage.getItem('bins')) // [{}, {}]
    if (!bins) { // <--- case if no bins yet
      const ary = [result]
      localStorage.setItem('bins', JSON.stringify(ary))
    } else { // case if there are already bins :D 
      bins.push(result)
      localStorage.setItem('bins', JSON.stringify(bins))
    }
    return result
  })
  .catch(err => console.error(err))
}

function getBin() {
  // Promise.allSettled() <--- [{}, {}, {}]
  return axios.get(PATH + PORT + '/' + binKey)
    .then(result => console.log(result.data))
}

export default {
  createBin,
  getBin
}