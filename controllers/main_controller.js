const 
  jwt = require('jwt-simple'),
  User = require('../models/user'),
  config = require('../config');


// Generates a JWT token.
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

module.exports = function(app) {
}
// Signs the user up for the service
exports.signup = function(req, res, next) {
   
//   User.findOne({ name: name }, function(err, existingUser) {
//     if (err) { return next(err); }

//     // If a user with name does exist, return an error
//     if (existingUser) {
//       return res.status(422).send( { error: 'That name is in use!' })
//     }

//     // If a user with an name does not exist, create and save use record
//     const user = new User({
//       name: name,
//     })

//     // Save the record to the database
//     user.save(function(err) {
//       if (err) { return next(err); }

//        // Respond to the request indicating the user was created
//       res.json({ token: tokenForUser(user) });
//     });
//   })
}
