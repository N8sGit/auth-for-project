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
  // User has already had their attendeeName and password authenticated
  // so they just need to be given a token.
  res.send({ token: tokenForUser(req.user)  });
}

// Signs the user up for the service
exports.signup = function(req, res, next) {
  const 
    attendeeName = req.body.email,
    password = req.body.password;
  //for now it seems that it errors out if password is removed
  // Handle the case of someone only providing an attendeeName,
  if (attendeeName && !password) {
    return res.status(422).send({
      error: 'Type your name'
    })
  }
  // See if a user with the given attendeeName exists.
User.findOne({ attendeeName: attendeeName }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with attendeeName does exist, return an error
    if (existingUser) {
      return res.status(422).send( { error: 'That name is in use!' })
    }

    // If a user with an attendeeName does not exist, create and save use record
    const user = new User({
      attendeeName: attendeeName,
    })

    // Save the record to the database
    user.save(function(err) {
      if (err) { return next(err); }

       // Respond to the request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });

}