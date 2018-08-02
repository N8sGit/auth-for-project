const 
  path = require('path')
  express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  router = require('./router'),
  // Main = require("./main"),
  mongoose = require('mongoose'),
  cors = require('cors');
  axios = require('axios')
// Database Setup
mongoose.connect('mongodb://localhost:auth/auth');

let testData = [
  {
		"First Name": "Emma",
		"Last Name": "Test 1",
		"Email": "fostdummy+1@gmail.com",
		"DOB": "01-01-81",
		"Zip": "10001",
		"Reg URL": "https://boomset.com/apps/eventpage/72056/update-sessions/attendee/24266591/d967d33e72ea1986d004dca59d5bd54a"
	},
	{
		"First Name": "Steve",
		"Last Name": "Test 2",
		"Email": "fostdummy+2@gmail.com",
		"DOB": "02-02-82",
		"Zip": "10002",
		"Reg URL": "https://boomset.com/apps/eventpage/72056/update-sessions/attendee/24266592/e61a0369fd9c99a56b0250f7b731cbbe"
	},
	{
		"First Name": "Shirly",
		"Last Name": "Test 3",
		"Email": "fostdummy+3@gmail.com",
		"DOB": "03-03-83",
		"Zip": "10003",
		"Reg URL": "https://boomset.com/apps/eventpage/72056/update-sessions/attendee/24266594/bc574c9bb9160692713bffbf89ef0c0a"
	},
	{
		"First Name": "Bill",
		"Last Name": "Test 4",
		"Email": "fostdummy+4@gmail.com",
		"DOB": "04-04-84",
		"Zip": "10004",
		"Reg URL": "https://boomset.com/apps/eventpage/72056/update-sessions/attendee/24266595/f6c4f6b43c8309627eaf67303e95abbf"
	},

];

let key = {
  "key": "f3ad371b4798b2368670127033955259ee7dc160"
}

// App/Middleware Setup
app.use(morgan('combined')); // Logging debugging
app.use(cors()) // Handles CORS
app.use(bodyParser.json({ type: '*/*' })); // Parses incoming requests as JSON
router(app);

//app.use('/main', require('./main'))

app.use(function(req, res, next){
  console.log(req.path, 'all paths')
   next()
});

app.use('/', function(req, res, next){
  console.log(req, 'req + plus this');
  next()
})

app.get('/main', function(req, res, next){
  console.log('hello');
  let message = 'this is the backend. You heard back from us.'
  res.send({message: message })
  next()
})

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})



// Server Setup
const 
  port = process.env.PORT || 3090,
  server = http.createServer(app);

server.listen(port);

console.log('Server is now running and listening on port: ', port)