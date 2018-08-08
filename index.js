const 
  path = require('path')
  express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  mongoose = require('mongoose'),
  cors = require('cors'),
  axios = require('axios')
// Database Setup

mongoose.connect('mongodb://localhost:auth/auth');

let testData = [
  {
		"firstname": "Emma",
		"lastname": "Amme",
		"email": "fostdummy+1@gmail.com",
		"dob": "01-01-81",
		"zip": "10001",
		"url": 'https://boomset.com/apps/eventpage/72056/update-sessions/attendee/24266591/d967d33e72ea1986d004dca59d5bd54a'
	},
	{
		"firstname": "Steve",
		"lastname": "Evets",
		"email": "fostdummy+2@gmail.com",
		"dob": "02-02-82",
		"Zip": "10002",
		"url": "https://boomset.com/apps/eventpage/72056/update-sessions/attendee/24266592/e61a0369fd9c99a56b0250f7b731cbbe"
	},
	{
		"firstname": "Shirly",
		"lastname": "Ylrihs",
		"email": "fostdummy+3@gmail.com",
		"dob": "03-03-83",
		"Zip": "10003",
		"url": "https://boomset.com/apps/eventpage/72056/update-sessions/attendee/24266594/bc574c9bb9160692713bffbf89ef0c0a"
	},
	{
		"firstname": "Bill",
		"lastname": "Llib",
		"email": "fostdummy+4@gmail.com",
		"dob": "04-04-84",
		"Zip": "10004",
		"url": "https://boomset.com/apps/eventpage/72056/update-sessions/attendee/24266595/f6c4f6b43c8309627eaf67303e95abbf"
	},

];

let key = {
  "key": "f3ad371b4798b2368670127033955259ee7dc160"
}

let testMessage = 'Hello from the backend'
// App/Middleware Setup
app.use(morgan('combined')); // Logging debugging
app.use(cors()) // Handles CORS
app.use(bodyParser.json({ type: '*/*' })); // Parses incoming requests as JSON
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next){
	console.dir(req.path, '\n all paths')
	next()
});

// app.post('/', function(req,res){
// 	if(!req.body.lastname){
// 		res.send({message: 'error, no inputs found'})
// 	}
// 	let last = req.body.lastname
// 	// last = last.replace(/ /g,'')
// 	// last = last.toLowerCase()
// 	// last = last[0].toUpperCase() + last.slice(1)
// 	// console.log(last, 'last name in backend');
// 	var source;
// 	var sourceIndex;
// 	//Validate string so that it is always the same as the format of the database;
// 	if(testData.some(function(value, index){
// 		if(value[last]){
// 			sourceIndex = index 
// 			return true 
// 		}
// 	})){
// 		source = testData[sourceIndex]
// 	}
// 		if(!source){ 
// 			res.send({message: 'Attendee not found.'})
// 		}
// 		else res.redirect(`${source.url}`)
// })

app.post('/', function(req, res){
	if(!req.body.lastname){
		console.log('No inputs!') 
	}
	var source;
	var sourceIndex;
	//Validate string so that it is always the same as the format of the database;
	if(testData.some(function(value, index){
		if(value[req.body.lastname]){
			sourceIndex = index 
			console.log(sourceIndex, 'source index');
			return true 
		}
	})){
		source = testData[sourceIndex]
		console.log(source, 'the source');
		console.log(source.url, 'source url');
	}
		if(!source){ 
			res.send({message: 'Attendee not found.'})
		}
		else res.redirect(`${source.url}`)
})







// Server Setup
const 
	port = process.env.PORT || 3090,
  server = http.createServer(app);
server.listen(port);

console.log('Server is now running and listening on port: ', port)