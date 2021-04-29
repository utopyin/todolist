const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy;
const { createTokens } = require('../middlewares/addUser')
const registerUser = require('../middlewares/registerUser')

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.NODE_ENV == 'dev' ? process.env.LOCAL + process.env.PORT : 'adress'}/auth/github/callback`,
    scope: [ 'user:email' ]
  },
  function(accessToken, refreshToken, {displayName, emails, photos}, done) {
    return done(null, {
      name: displayName,
      email: emails[0].value,
      picture: photos[0].value
    });
  }
));

module.exports = (app) => {
  app.get('/auth/github',
  passport.authenticate('github', {
    session: false,
  }));

  app.get('/auth/github/callback', 
    [passport.authenticate('github', {
      failureRedirect: 'http://localhost:3000/?error=bad_auth',
      session: false
    }), registerUser], async (req, res) => {
      try {
        const [token, refreshToken] = await createTokens(req.user, process.env.JWT_SECRET, process.env.JWT_SECRET_2)
        res.redirect(`http://localhost:3000/?accessToken=${token}&refreshToken=${refreshToken}`);
      } catch (err) {
        console.log(err)
        res.redirect("http://localhost:3000/?error=bad_auth");
      }
    }
  );
}