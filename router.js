const 
  Authentication = require('./controllers/authentication'),
  passportService = require('./services/passport'),
  passport = require('passport');

const 
  requireAuth = passport.authenticate('jwt', { session: false }),
  requireSignIn = passport.authenticate('local', { session: false });

// Route Exports
module.exports = function(app) {
 
}