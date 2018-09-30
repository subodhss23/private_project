const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DIST_DIR = path.resolve(__dirname, '../../dist/');


// serve static assets normally
// app.use(express.static(__dirname + '../client/app/assets'))

// Handles all routes so you do not get a not found error

app.get('/fonts/*', (req, res) =>  {
	res.sendFile(path.resolve(DIST_DIR, req.originalUrl.substr(1)))
})

app.get('/*/slides/*.png', (req, res) =>  {
	res.sendFile(path.resolve(DIST_DIR, req.originalUrl.substr(1)))
})

app.get('/*/*.jpg', (req, res) =>  {
	res.sendFile(path.resolve(DIST_DIR, req.originalUrl.substr(1)))
})

app.get('/*/*.png', (req, res) =>  {
	res.sendFile(path.resolve(DIST_DIR, req.originalUrl.substr(1)))
})

app.get('/*/icon@2x.png', (req, res) =>  {
	res.sendFile(path.resolve(DIST_DIR, req.originalUrl.substr(1)))
})

app.get('/icon@2x.png', (req, res) => res.sendFile(path.resolve(DIST_DIR, 'icon@2x.png')))
app.get('/bundle.js', (req, res) => res.sendFile(path.resolve(DIST_DIR, 'bundle.js')))
app.get('/style.css', (req, res) => res.sendFile(path.resolve(DIST_DIR, 'style.css')))

app.post('/feedback', (req, originalResponseHandler) => {
	console.log("Got feedback - " + JSON.stringify(req.body))

	var options = {
		method: 'POST',
	  url: 'https://api.airtable.com/v0/applcD6rmQCWF1iq4/feedback',
	  headers: {
	  	"Authorization": 'Bearer keybSbM8CVDWe6Uzj',  
	    "Content-type": 'application/json'
	  },
	  body: JSON.stringify(req.body)
	};

	request.post(options, function(err, res, body) {
		  if (err) {
		    console.error('upload failed:', err);
		  }
		  else {
		 		console.log('Upload successful!  Server responded with:', body);
			}
			originalResponseHandler.send({})
		}
	)
})

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

app.listen(port)
console.log("server started on port " + port)