const path = require('path')
express = require('express'),
cookieParser = require('cookie-parser')
http = require('http'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
app = express(),
cheerio = require('cheerio'),
axios = require('axios'),
boomsetKey = require('./secret'),
rawData = require('./data')
const data = Array.from(rawData)
console.log(rawData);

// App/Middleware Setup
app.use(morgan('combined')); // Logging debugging

app.use(bodyParser.json({ type: '*/*' })); // Parses incoming requests as JSON
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'));
app.use(cookieParser())

var sessionIds, sessionsArr, eventAttendees = []
var eventInfo  = {}

function getGuests(){
  axios.get('https://www.boomset.com/restapi/eventsessions/settings/72056/get_sessions', 
  { headers: {Authorization: `Token ${boomsetKey.key}`}})
  
	.then(function(response){
			  sessionsArr = Array.from(response.data)
			  axios.get("https://www.boomset.com/restapi/guestlist/72056", { headers: 
			  {Authorization: `Token ${boomsetKey.key}`}})
			  .then((response) => {
				  eventAttendees = Array.from(response.data.results)
				  console.log(eventAttendees, 'huh');
			  })
		  })
			.then(function(response){
				  axios.get("https://www.boomset.com/restapi/events/72056/info",{ headers: 
			  {Authorization: `Token ${boomsetKey.key}`}} 
			  )
			   .then(response => {

			  eventInfo = response.data	
	  })
  })
	  .catch(err => console.err(err + ' error at getGuests'))
}

getGuests();
setInterval(getGuests, 60000);

console.log(eventAttendees, 'hello????????');
function memoize(attendeeData){
	  let foundAttendee = eventAttendees.find(function(value){
		  return value.contact.first_name.toLowerCase().trim() === attendeeData.firstName.toLowerCase() && value.contact.last_name.toLowerCase().trim() === attendeeData.lastName.toLowerCase()
	  })

	  for(var i = 0; i<eventAttendees.length; i++){
		if(eventAttendees[i].contact.first_name.toLowerCase() === attendeeData.firstName){
		}
	  }

	  if(!foundAttendee){
		  return {errorMessage: 'No attendee found'}
	  }
	  sessionIds = foundAttendee.sessions.out
	  let result = []

	  for(let i =0; i<sessionsArr.length; i++){
		  if (sessionIds.includes(sessionsArr[i].id.toString())){
			  result.push(sessionsArr[i])
		  } 
	  }
	  let tags = {...eventInfo.session_tags}
	  
	  let tagRefs = result.map( (value, index) => {
		  return { id: result[index].id, tags: result[index].tags, tracks: []}
	  })

	  tagRefs.map((value, index) => {
		  tagRefs[index].tags.map((tag) =>{
			  for(let prop in tags){
				  if(tags[prop].id === tag){
					  tagRefs[index].tracks.push(tags[prop].tag)
				  }
			  }
		  })
	  })
	  console.log(result, tagRefs, 'data in memozize');
	  return {result, tagRefs}

}



app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, './client/public/index.html'));
});

app.get('/bundle.js', function(req, res){
  console.log('bundle server hit');
  res.sendFile(path.resolve(__dirname, './client/public/bundle.js'));
  
});

app.get('/css', function(req,res){
  res.sendFile(path.resolve(__dirname, './client/src/style.css'))
})

app.use(function(req, res, next){
  console.dir(req.path, '\n all paths')
  next()
});

app.post('/source', function(req,res){
	let source; 	
	
	function confirmSource(){
		for(let i = 0; i<data.length; i++){
			if(data[i].url === req.body.url){
				source = data[i]
				return true
			}
		}
		return false 
	}
	confirmSource();
	console.log(source, 'source');
	res.send({source})
  })

  app.post('/boomset', function(req, res) {
	console.log('hello');
	console.log(req.body, 'recbody');
   attendeeData = req.body.source
  let output = memoize(attendeeData)
  console.log(output, 'boomset output');
  res.send(output)
})






app.post('/', function(req, res){
	console.log(req.body, 'request body');
  let notFound = 'Attendee not found. Please re-enter your information or contact FOST representatives for assistance'
  if(!req.body.lastName || !req.body.firstName){
	  res.send({errorMessage : notFound})
  }
  let source, url;
  
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
console.log(source, 'source');
  function confirmZip(source){
	  if(source.firstName.toLowerCase() === req.body.firstName){
		  return true
	  }
	  else return false 
  }
  
  console.log('here');
  console.log(source, confirmZip(source));
  if(source && confirmZip(source)){ 
	  console.log('exit point');
	  console.log(source, confirmZip(source), 'here');
	  res.cookie('FOST', url, { expires: new Date(Date.now() + 1000000000000000000)})
	  res.send({message:"data for the front end", url, source})
	  
  }
})







// Server Setup
const 
  port = process.env.PORT || 3090,
server = http.createServer(app);
server.listen(port);

console.log('Server is now running and listening on port: ', port)
