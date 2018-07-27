const 
  express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  router = require('./router'),
  main = require("./main"),
  mongoose = require('mongoose'),
  cors = require('cors');
// Database Setup
mongoose.connect('mongodb://localhost:auth/auth');


// App/Middleware Setup
app.use(morgan('combined')); // Logging debugging
app.use(cors()) // Handles CORS
app.use(bodyParser.json({ type: '*/*' })); // Parses incoming requests as JSON
router(app);

app.get('./main', function(req, res){
  console.log('req',req, 'res', res)
  console.log('main server rout');
})

// Server Setup
const 
  port = process.env.PORT || 3090,
  server = http.createServer(app);

server.listen(port);

console.log('Server is now running and listening on port: ', port)