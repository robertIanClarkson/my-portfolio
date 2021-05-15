var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const { getAdmin } = require('./../db/helpers');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user)
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    getAdmin(username)
      .then((user) => {
        if(!user) return done(null, false, { message: 'Incorrect username.' });
        if(user.password != password) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  }
));

module.exports = {
  passport
}