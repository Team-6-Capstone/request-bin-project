require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const Pool = require('pg').Pool
const pool = new Pool()

const mongoSchema = new mongoose.Schema({
	binKey: String,
	request: Array,
	params: Object
})

const  = mongoose.model('JobData', JobDataSchema)

const mongoUrl = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4/test'
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
		const ind = Math.floor(Math.random() * alpha.length)
		str += alpha[ind]
	}
	return str
}
// mongoose schema
// create bin and targetUrl and
app.post('/create', (req, res) => {
	const binKey = createRandomStr()
	const path = 'http\://localhost\:3002/' + binKey
	pool.query(`INSERT INTO bin VALUES(DEFAULT, '${binKey}', DEFAULT, DEFAULT);`)
	res.send([binKey, path])
})

// take binId from request string and save request to the database
app.all('/:binKey', async (req, res) => {
	// take request string and parse id get from db 
	// local storage
	try {
	await mongoose.connect(mongoUrl)
	const testQuery = new mongoSchema({binKey:'n13migs84', request: [], params: {}})
	await testQuery.save()
	await mongoose.connection.close()
	} catch(e) {
		console.log(e)
	}
	const key = req.params
	const query = await	pool.query('SELECT * FROM bin;')
	res.send([req.rawHeaders, req.params])
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
