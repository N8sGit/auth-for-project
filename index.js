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
console.log(data, Array.isArray(data));

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
	for(let i = 0; i<data.length; i++){
		if(data[i].lastname === req.body.lastname){
			source = data[i]
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