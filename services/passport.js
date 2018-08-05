const 
  passport = require('passport'),
  User = require('../models/user'),
  config = require('../config'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  LocalStrategy = require('passport-local');

console.log('entry point to the passport auth');
// Local Strategy
const localOptions = { nameField: 'name' }
const localLogin = new LocalStrategy(localOptions, function(name, undefined,  done) {
  // Verify this username and password, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false
  User.findOne({ name: name }, function(err, user) {
    if (err) { return done(err); }

    if (!user) { return done(null, false); }

    // Compare passwords - is 'password' equal to user.password?
    user.comparePassword(password, function (err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  })
})

// Setup options for JWT strategy
const jwtOptions = { 
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }

  });
});

// Tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);