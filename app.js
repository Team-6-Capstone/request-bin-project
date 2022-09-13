const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser');
// const querystring = require('querystring');

const app = express()
const PORT = 3002

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.post('/api/bin', (req, res) => {
	const data = []
	for (prop in req) {
		data.push(prop)
	}
	res.send(data)
})

app.get('/api/bin', (req, res) => {
	const data = [req.rawHeaders, req.query, req.params]
	res.send(data)
})

app.listen(process.env.PORT || PORT, () => {
	console.log('listening on port 3002')
})
// Host: dnsdatacheck.2ruehnqius4x8kd0.b.requestbin.net
//
// Connection: close
//
// User-Agent: GitHub-Hookshot/3116550
//
// Accept: */*
//
// X-Github-Delivery: 84783b4e-32da-11ed-98da-a6627229a26f
//
// X-Github-Event: push
//
// X-Github-Hook-Id: 379030870
//
// X-Github-Hook-Installation-Target-Id: 459729154
//
// X-Github-Hook-Installation-Target-Type: repository
//
// Content-Type: application/x-www-form-urlencoded
//
// X-Request-Id: 5b807b3e-844e-4f10-b2ac-8ed4081057c9
//
// X-Forwarded-For: 140.82.115.92
//
// X-Forwarded-Proto: http
//
// X-Forwarded-Port: 80
//
// Via: 1.1 vegur
//
// Connect-Time: 0
//
// X-Request-Start: 1663014963469
//
// Total-Route-Time: 0
//
// Content-Length: 10080
