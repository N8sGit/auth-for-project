const 
  path = require('path')
  express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  mongoose = require('mongoose'),
  // cors = require('cors'),
  axios = require('axios')
// Database Setup

mongoose.connect('mongodb://localhost:auth/auth');

var testData = [
  {
		"firstname": "emma",
		"lastname": "amme",
		"email": "fostdummy+1@gmail.com",
		"dob": "01-01-81",
		"zip": "10001",
		"url": 'https://example.com'
	},
	{
		"firstname": "steve",
		"lastname": "evets",
		"email": "fostdummy+2@gmail.com",
		"dob": "02-02-82",
		"Zip": "10002",
		"url": "https://boomset.com/apps/eventpage/72056/update-sessions/attendee/24266592/e61a0369fd9c99a56b0250f7b731cbbe"
	},
	{
		"firstname": "shirly",
		"lastname": "ylrihs",
		"email": "fostdummy+3@gmail.com",
		"dob": "03-03-83",
		"Zip": "10003",
		"url": "https://boomset.com/apps/eventpage/72056/update-sessions/attendee/24266594/bc574c9bb9160692713bffbf89ef0c0a"
	},
	{
		"firstname": "bill",
		"lastname": "llib",
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
// var corsOptions = {
//   origin: 'http://localhost:8080',
// 	optionsSuccessStatus: 200,
// }
// app.use(cors(corsOptions)) // Handles CORS
app.use(bodyParser.json({ type: '*/*' })); // Parses incoming requests as JSON
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'));



app.get('/', function(req, res) {
	console.log('hello there matey');
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.get('/bundle', function(req, res){
	res.sendFile(path.resolve(__dirname, '/client'));
});



app.use(function(req, res, next){
	console.dir(req.path, '\n all paths')
	next()
});


app.post('/', function(req, res){
	console.log(req, 'post req');
	if(!req.body.lastname){
		console.error('No inputs!') 
	}
	var source;
	var sourceIndex;
	var confirmAttendee = testData.some(function(value, index){
		if(value[req.body.lastname] || value.lastname){
			console.log(index, '.some function index');
			sourceIndex = index 
			console.log(sourceIndex, 'index of the object in the array coresponding to the location of the relevant data');
			return true 
		}
	})
console.log(confirmAttendee, 'true if present, false if nay');

	if(confirmAttendee){
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