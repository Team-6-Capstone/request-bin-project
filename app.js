require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const Pool = require('pg').Pool
const pool = new Pool()

const app = express()
const PORT = 3002

app.use(express.static(path.join(__dirname, 'public')))

/*
A: take the binid and path, send back with res.send (to display url and id 
and save to local storage) postgres save to 
*/
const createRandomStr = () => {
	let str = ""
	const alpha = "abcdefghijklmnopqrstuvwxyz1234567890"
	for (i = 0; i < 10; i++) {
		const ind = Math.floor(Math.random() * i)
		str += alpha[ind]
	}
	return str
}
// mongoose schema 
// create bin and targetUrl and 
app.post('/create', (req, res) => {
	const binKey = createRandomStr()
	const path = 'http\://localhost\:3002/' + binKey
	pool.query(`INSERT INTO bin VALUES(DEFAULT, '${binKey}');`)
	res.send([binKey, path])
})

// take binId from request string and save request to the database
app.all('/:binKey', (req, res) => {
	// take request string and parse id get from db 
	// local storage
})

app.post('/api/bin', (req, res) => {
	const data = []
	for (prop in req) {
		data.push(prop)
	}
	res.send(data)
})

app.get('/api/bin', (req, res) => {
	const data = [req.rawHeaders, req.query, req.params]
	res.send(createRandomStr())
})

app.listen(process.env.PORT || PORT, () => {
	console.log('listening on port 3002')
})
