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

// serves static files
app.use(express.static(path.join(__dirname, 'public')))

// parses body to raw form
app.use(express.raw({ inflate: true, limit: '50mb', type: () => true }));

const createRandomStr = () => {
	let str = ""
	const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
	for (i = 0; i < 25; i++) {
		const ind = Math.floor(Math.random() * alpha.length)
		str += alpha[ind]
	}
	return str
}

// creates new binKey
app.post('/create', async (req, res) => {
  const binKey = createRandomStr()
  await pool.query(`INSERT INTO bin VALUES(DEFAULT, '${binKey}', DEFAULT, DEFAULT);`)
  let createdTime = await pool.query(`SELECT created_at FROM bin WHERE binkey = '${binKey}';`)
  // console.log(createdTime)
  createdTime = createdTime.rows[0].created_at
  res.status(201).send({binKey, createdTime})
})

const {ids} = require('webpack')
// test to see if everything is working with mongo and easy access to db
app.get('/testMongo', async (req, res) => {
	try {
		await mongoose.connect(mongoUrl)
		let data = await reqData.find()
		mongoose.connection.close()
		res.send(data)
	} catch(e) {
		console.log(e)
	}
})

// parses array of headers into object
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

const createRequestData = (headers, body, req) => {
	const stamp = new Date()
	return {
		created: stamp.toUTCString(),
		ip: req.ip,
		path: req.path,
		http_method: req.method,
		protocol: req.protocol,
		Content_type: headers['Content-Type'],
		content_length: headers['Content-Length'],
		rawBody: body
	}
}

const createItems = (headers, req) => {
	return {
		form_post_parameters: req.params,
		headers: headers
	}
}

const createBody = (req) => {
	let body = req.body
	if (body.constructor.name == 'Buffer') {
		body = body.toString();
	} else {
		body = JSON.stringify(body);
	}
	return body
}

app.all('/target/:binKey', async (req, res) => {
	const body = createBody(req)
	const headers = parseHeaders(req.rawHeaders)
	const requestData = createRequestData(headers, body, req)
	const items = createItems(headers, req)
	let mongoID

	try {
		await mongoose.connect(mongoUrl)
		const newRequest = new reqData({requestData, items})
		mongoID = newRequest._id
		await newRequest.save()
		await mongoose.connection.close()
		await insertRequest(req.params.binKey, mongoID)
	} catch(e) {
		console.log(e)
	}

	res.sendStatus(200)
})

// asynchronosly builds array of requests
const mongoRequestArr = async (idsArray) => {
	const res = []
	await mongoose.connect(mongoUrl)
	for (i=0; i<idsArray.length; i++) {
		let data = await reqData.findById(idsArray[i])
		res.push(data)
	}
	mongoose.connection.close()
	return res
}

// gets all the requests from mongo db using table data from postgres and returns an array of requests
// along with all the data for the bin (when created and such)
app.get('/view/:binKey', async (req, res) => {
	let requests;
	let binDetails
	try {
		await pool.query(`UPDATE bin SET last_accessed = now() WHERE binkey = '${req.params.binKey}'`)

		binDetails = await pool.query(`SELECT * FROM bin WHERE binkey = '${req.params.binKey}'`)
		binDetails = binDetails.rows[0]

		let requestIDs = await pool.query(`SELECT mongokey FROM request WHERE binid = '${binDetails.id}'`)
		requestIDs = requestIDs.rows.map(row => row.mongokey)

		delete binDetails.id
		requests = await mongoRequestArr(requestIDs)
	} catch(e) {
		console.log(e)
		res.status(502)
	}
	res.status(200).send({binDetails, requests})
})

app.listen(process.env.PORT || PORT, () => {
	console.log('listening on port 3002')
})