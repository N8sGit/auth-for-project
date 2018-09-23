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

app.post('/boomset', function(req, res) {
	let attendeeData = req.body.source
	let sessionIds, sessionsArr, tagRefs
	
	axios.get('https://www.boomset.com/restapi/eventsessions/settings/72056/get_sessions', 
	{ headers: {Authorization: `Token ${boomsetKey.key}`}
	})
		.then(function(response){
			sessionsArr = Array.from(response.data)
			
			axios.get(`https://www.boomset.com/restapi/guestlist/72056`, { headers: 
			 {Authorization: `Token ${boomsetKey.key}`}}
			)
			 .then((response) => {
				  let eventAttendees = Array.from(response.data.results)
				  let foundAttendee = eventAttendees.find(function(value){
					return value.contact.email === attendeeData.email
				})
				 sessionIds = foundAttendee.sessions.out
				let result = []
				for(let i =0; i<sessionsArr.length; i++){
					if (sessionIds.includes(sessionsArr[i].id.toString())){
						result.push(sessionsArr[i])
					} 
				}
				tagRefs = result.map( (value, index) => {
					return { id: result[index].id, tags: result[index].tags, tracks: []}
				})
					return result 
			
				})
				  .then(result => {
					axios.get(`https://www.boomset.com/restapi/events/72056/info`,{ headers: 
						{Authorization: `Token ${boomsetKey.key}`}} 
					)
					 .then(response =>{
						 let tags = {...response.data.session_tags}
						
							tagRefs.map((value, index) => {
								tagRefs[index].tags.map((tag) =>{
									for(let prop in tags){
										if(tags[prop].id === tag){
											tagRefs[index].tracks.push(tags[prop].tag)
										}
									}
								})
							})
						return {result, tagRefs}					
					})
					 .then(output =>{
						res.send(output)
					})
			  		  .catch(err => console.error(err + ' error at session metadata retrieval endpoint'))
		})
	})
	  .catch(err => console.error(err + ' error inside attendee get'))

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