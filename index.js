const 
  path = require('path')
  express = require('express'),
  cookieParser = require('cookie-parser')
  http = require('http'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  axios = require('axios'),
  boomsetKey = require('./secret'),
  rawData = require('./data')


const data = Array.from(rawData)
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

app.get('/boomset', function(req, res) {
	console.log('route hit');
	axios.get('https://www.boomset.com/apps/api/events/', 
	{ headers: {Authorization: `Token f3ad371b4798b2368670127033955259ee7dc160`}
	}).then(function(response){
		console.log(response, 'api resposne');
		res.send({ message: "this is the api call packet", response})
	})
	  .catch(err => console.error( error + ' error at boomset api call'))
});



app.post('/', function(req, res){
	console.log(req, 'request');
	let notFound = 'Attendee not found. Please re-enter your information or contact FOST representatives for assistance'
	if(!req.body.lastName || !req.body.zip){
		res.send({errorMessage : notFound})
	}
	var source, confirmAttendee, url;
	
	function confirmAttendee(){
	for(let i = 0; i<data.length; i++){
		if(data[i].lastName.toLowerCase() === req.body.lastName){
			source = data[i]
			url = source.url
			return true
		}
	}
	return false 
}
	confirmAttendee()

	function confirmZip(source){
		if(source.zip === req.body.zip){
			return true
		}
		else return false 
	}
	

	if(source && confirmZip(source)){ 
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