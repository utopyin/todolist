const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const { createTokens } = require('../middlewares/addUser')
const registerUser = require('../middlewares/registerUser')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.LOCAL}/auth/google/callback`,
    passReqToCallback : true
  },
  function(request, accessToken, refreshToken, {email, given_name, picture}, done) {
    return done(null, {
      name: given_name,
      email: email,
      picture: picture
    });
  }
));

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: [ 'email', 'profile' ],
    session: false,
  }));

  app.get('/auth/google/callback',
    [passport.authenticate('google', {
      failureRedirect: '/',
      session: false
    }), registerUser], async (req, res) => {
      try {
        const [token, refreshToken] = await createTokens(req.user, process.env.JWT_SECRET, process.env.JWT_SECRET_2)
        res.redirect(`${process.env.ADRESS}/?accessToken=${token}&refreshToken=${refreshToken}`);
      } catch (err) {
        console.log(err)
        res.redirect(`${process.env.ADRESS}/?error=bad_auth`);
      }
    }
  );
}