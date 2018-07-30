const 
  jwt = require('jwt-simple'),
  User = require('../models/user'),
  config = require('../config');

// Generates a JWT token.
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password authenticated
  // so they just need to be given a token.
  res.send({ token: tokenForUser(req.user)  });
}

// Signs the user up for the service
exports.signup = function(req, res, next) {
    console.log(req.body, 'this is just poking around the signup request at the controller in the client')

  res.send({message: 'this is an example send off'}) 

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send( { error: 'That email is in use!' })
    }

    // If a user with an email does not exist, create and save use record
    const user = new User({
      email: email,
    })

    // Save the record to the database
    user.save(function(err) {
      if (err) { return next(err); }

       // Respond to the request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  })
}
