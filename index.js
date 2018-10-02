const 
  path = require('path')
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

// App/Middleware Setup
app.use(morgan('combined')); // Logging debugging

app.use(bodyParser.json({ type: '*/*' })); // Parses incoming requests as JSON
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'));
app.use(cookieParser())

let sessionsArr, boomRes, sessionIds, eventAttendees, tagRefs = [];
let foundatendee = ''






app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, './client/public/index.html'));
});

app.get('/bundle.js', function(req, res){
	console.log('bundle server hit');
	res.sendFile(path.resolve(__dirname, './client/public/bundle.js'));
	
});

app.get('/css', function(req,res){
	console.log('route hit');
	res.sendFile(path.resolve(__dirname, './client/src/style.css'))
})

app.use(function(req, res, next){
	console.dir(req.path, '\n all paths')
	next()
});




axios.get(`https://www.boomset.com/restapi/guestlist/72056`, { headers: 
			 {Authorization: `Token ${boomsetKey.key}`}}
			)
			 .then((response) => {
				 foundatendee = foundatendee
				   eventAttendees = Array.from(response.data.results);
				console.log(eventAttendees.length, 'event attendee length');
				foundAttendee = eventAttendees.find(function(value){
					return value.contact.email === attendeeData.email
				})
				console.log(foundAttendee, 'foundatendee');
				if(foundatendee === ''){
					res.send({message: 'There was a problem finding this attendee. Please contact FOST.'})
				}
				else  sessionIds = foundAttendee.sessions.out
				console.log(sessionIds, 'sessionIds in the initiale lookup');
})

console.log(sessionsArr, boomRes, sessionIds, eventAttendees, tagRefs, foundatendee , 'ALL INITIAL');
app.post('/boomset', function(req, res) {
	let attendeeData = req.body.source
	console.log(req.body.source);
	axios.get('https://www.boomset.com/restapi/eventsessions/settings/72056/get_sessions', 
	{ headers: {Authorization: `Token ${boomsetKey.key}`}
	})
		.then(function(response){
			sessionsArr = Array.from(response.data)
			console.log(sessionsArr.length, 'if sessionsArr.length greater than 0 it has data')})
		.then(function(response){
			axios.get(`https://www.boomset.com/restapi/events/72056/info`,{ headers: 
						{Authorization: `Token ${boomsetKey.key}`}} 
					)
					 .then(response =>{
						console.log(sessionIds, 'sessionIds');
						console.log(response);
						for(let i =0; i<sessionsArr.length; i++){
							if (sessionIds.includes(sessionsArr[i].id.toString())){
								console.log(sessionsArr[i].id);
								boomRes.push(sessionsArr[i])
							} 
						}
						console.log(boomRes, 'boomRes after session array iterated to find the corresponding info');
						
						tagRefs = boomRes.map( (value, index) => {
							return { id: boomRes[index].id, tags: boomRes[index].tags, tracks: []}
						})
						console.log(tagRefs, 'tagRefs');

						let tags = {...response.data.session_tags}
						
						console.log(tags, 'tags ');
							tagRefs.map((value, index) => {
								tagRefs[index].tags.map((tag) =>{
									for(let prop in tags){
										if(tags[prop].id === tag){
											tagRefs[index].tracks.push(tags[prop].tag)
										}
									}
								})
							})
							return boomRes;
						})
						console.log('before second then ');
						return {boomRes, tagRefs}					
					})
					 .then(output =>{
						 console.log(output, 'api request output');
						res.send(output)
					})
			  		  .catch(err => console.error(err + ' error at session metadata retrieval endpoint'))
		})




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
	res.send({source})
})


app.post('/', function(req, res){
	let notFound = 'Attendee not found. Please re-enter your information or contact FOST representatives for assistance'
	if(!req.body.lastName || !req.body.zip){
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

	function confirmZip(source){
		if(source.zip === req.body.zip){
			return true
		}
		else return false 
	}
	

	if(source && confirmZip(source)){ 
		res.cookie('FOST', url, { expires: new Date(Date.now() + 1000000000000000000)})
		res.send({message:"data for the front end", url, source})
		
	}
	else res.send({notFound})
})







// Server Setup
const 
	port = process.env.PORT || 3090,
  server = http.createServer(app);
server.listen(port);

console.log('Server is now running and listening on port: ', port)