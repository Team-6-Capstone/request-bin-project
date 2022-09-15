require('dotenv').config()
const express = require('express')
const path = require('path')

const Pool = require('pg').Pool
const pool = new Pool()

const mongoose = require('mongoose')
const mongoSchema = new mongoose.Schema({
	requestData: Object,
	items: Object
})

const reqData = mongoose.model('reqData', mongoSchema)

const mongoUrl = process.env.DATABASE_URL
const app = express()
const PORT = 3002

app.use(express.static(path.join(__dirname, 'public')))

/*
A: take the binid and path, send back with res.send (to display url and id
and save to local storage) postgres save to
*/
const createRandomStr = () => {
	let str = ""
	const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
	for (i = 0; i < 25; i++) {
		const ind = Math.floor(Math.random() * alpha.length)
		str += alpha[ind]
	}
	return str
}
// mongoose schema
// create bin and targetUrl and
app.post('/create', async (req, res) => {
  const binKey = createRandomStr()
  await pool.query(`INSERT INTO bin VALUES(DEFAULT, '${binKey}', DEFAULT, DEFAULT);`)
  let createdTime = await pool.query(`SELECT created FROM bin WHERE binkey = '${binKey}';`)
  createdTime = createdTime.rows[0].created
  res.status(201).send({binKey, createdTime})
})

const bodyParser = require('body-parser');
app.use(bodyParser.raw())
app.get('/testMongo', async (req, res) => {
	await mongoose.connect(mongoUrl)
	let data = await reqData.find()
	mongoose.connection.close()
	res.send(data)
	//res.send(req.body)
})

// take binId from request string and save request to the database
const parseHeaders = (headersArr) => {
	const res = {}
	for (i=1; i<headersArr.length; i += 2) {
		res[headersArr[i-1]] = headersArr[i]
	}
	return res
}

// create psql request record
const insertRequest = async function(binKey, mongoID) {
	let binID = await pool.query(`SELECT id FROM bin WHERE binkey = '${binKey}';`)
  binID = binID.rows[0].id

	pool.query(`INSERT INTO request VALUES(DEFAULT, '${mongoID}', DEFAULT, ${binID});`)
}

app.all('/target/:binKey', async (req, res) => {
	// take request string and parse id get from db
	const stamp = new Date()
	const requestData = {
		created: stamp.getDate(),
		//size: int (may be null),
		ip: req.ip,
		path: req.path,
		http_method: req.method,
		protocol: req.protocol,
		//Content_type: ,
	}
	const items = {
		raw_body: req.body,
		form_post_parameters: req.params,
		headers: parseHeaders(req.rawHeaders)
	}
	let mongoID
	try {
		mongoose.connect(mongoUrl)
		const newRequest = new reqData({requestData, items})
		mongoID = newRequest._id
		await newRequest.save()
		await mongoose.connection.close()
	} catch(e) {
		console.log(e)
	}

	insertRequest(req.params.binKey, mongoID)
	// const key = req.params
	// const query = await	pool.query('SELECT * FROM bin;')
	// res.send([mongoID, requestData, items])
	res.send()
})


app.get('/view/:binKey', async (req, res) => {
  await pool.query(`UPDATE bin SET lastaccessed = now() WHERE binkey = '${req.params.binKey}'`)

  let binDetails = await pool.query(`SELECT * FROM bin WHERE binkey = '${req.params.binKey}'`)
  binDetails = binDetails.rows[0]

  let requestIDs = await pool.query(`SELECT mongokey FROM request WHERE binid = '${binDetails.id}'`)
  requestIDs = requestIDs.rows.map(row => row.mongokey)

  delete binDetails.id
  res.send({binDetails, requestIDs})
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
