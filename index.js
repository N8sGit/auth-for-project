const 
  path = require('path')
  express = require('express'),
  cookieParser = require('cookie-parser')
  http = require('http'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  axios = require('axios');
  boomsetKey = require('./secret');

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

// App/Middleware Setup
app.use(morgan('combined')); // Logging debugging

app.use(bodyParser.json({ type: '*/*' })); // Parses incoming requests as JSON
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'));
app.use(cookieParser())

app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, './client/public/index.html'));
});

app.get('/bundle.js', function(req, res){
	console.log('bundle server hit');
	res.sendFile(path.resolve(__dirname, './client/public/bundle.js'));
	
});

app.get('/style/style.css', function(req,res){
	res.sendFile(path.resolve(__dirname, './client/src/style.css'))
})

app.use(function(req, res, next){
	console.dir(req.path, '\n all paths')
	next()
});


axios.get('https://www.boomset.com/restapi/', {headers: 'Authorization'})
	.then(function(response){
		console.log(response);
	})




app.post('/', function(req, res){
	let notFound = 'Attendee not found. Please re-enter your information or contact FOST for assistance'
	if(!req.body.lastname){
		console.error('No inputs!') 
	}
	var source, confirmAttendee, url;
	
	function confirmAttendee(){
	for(let i = 0; i<testData.length; i++){
		if(testData[i].lastname === req.body.lastname){
			source = testData[i]
			url = source.url
			return
		}
	}
	return false 
}
	confirmAttendee()

	function confirmDate(source){
		let yob = source.dob.slice(-2)
		let reqYob = req.body.dob.slice(2,4)
		if(yob === reqYob){
			return true
		}
		else return false 
	}
	

	if(source && confirmDate(source)){ 
		//date will need to be set to be after confernece
		res.cookie('FOST', url, { expires: new Date(Date.now() + 1000000000000000000)})
		res.send({message:"data for the front end", url: url})
		
	}
	else res.send({notFound})
})







// Server Setup
const 
	port = process.env.PORT || 3090,
  server = http.createServer(app);
server.listen(port);

console.log('Server is now running and listening on port: ', port)