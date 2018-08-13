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
		"url": 'https://boomset.com/apps/eventpage/72056/update-sessions/attendee/24266592/e61a0369fd9c99a56b0250f7b731cbbe'
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

app.use(bodyParser.json({ type: '*/*' })); // Parses incoming requests as JSON
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'));


app.get('/', function(req, res) {
	console.log('hello there matey');
  res.sendFile(path.resolve(__dirname, './client/public/index.html'));
});

app.get('/bundle.js', function(req, res){
	console.log('hit!');
	console.log(__dirname, 'what is this?');

	res.sendFile(path.resolve(__dirname, './client/public/bundle.js'));

	//res.sendFile look it up
});

app.get('/style/style.css', function(req,res){
	console.log('this sends the stylesheet');
	console.log(res, 'this is the stylesheet?');
	res.sendFile(path.resolve(__dirname, './client/src/style.css'))
})

// /Users/nateanecone/work/auth-portal/client/bundle.js

app.use(function(req, res, next){
	console.dir(req.path, '\n all paths')
	next()
});


app.post('/', function(req, res){
	console.log(req, 'post req');
	if(!req.body.lastname){
		console.error('No inputs!') 
	}
	var source, sourceIndex, confirmAttendee, url;
	// var confirmAttendee = testData.some(function(value, index){
	// 	if(value[req.body.lastname] || value.lastname){
	// 		console.log(index, '.some function index');
	// 		sourceIndex = index 
	// 		console.log(sourceIndex, 'index of the object in the array coresponding to the location of the relevant data');
	// 		return true 
	// 	}
	// })
	function confirmAttendee(){
	for(let i = 0; i<testData.length; i++){
		if(testData[i].lastname === req.body.lastname){
			source = testData[i]
			sourceIndex = i
			url = source.url
			return true
		}
	}
	return false 
}
	confirmAttendee()
	console.log(confirmAttendee());

	function confirmDate(source){
		console.log(req.body.dob, 'req dob');
		let yob = source.dob.slice(-2)
		console.log(yob, 'yob');
		let reqYob = req.body.dob.slice(2,4)
		console.log(reqYob, 'reqyob');
		if(yob === reqYob){
			return true
		}
		else return false 
	}
	

	if(source && confirmDate(source)){ 
		res.send({message:"data for the front end", url: url})
		
	}
		else res.send({message: 'Attendee not found.'})
})







// Server Setup
const 
	port = process.env.PORT || 3090,
  server = http.createServer(app);
server.listen(port);

console.log('Server is now running and listening on port: ', port)