const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const googleKeys = require('../config');
const User = require('../models/userModel');


// remove serialize and deserializeUser from here if not using cookies or using jwt for authentication and in
// passport.authenticate('xyz', {'session': false}) set session to false
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, (err, user) => {
        if (err) throw err;
        done(null, user);
    })
});

passport.use(new googleStrategy({
    clientID: googleKeys.google.ClientID,
    clientSecret: googleKeys.google.ClientSecret,
    callbackURL: '/auth/redirect'
}, (accessToken, refreshToken, profile, done) => { // callback function which exchange query params code for profile info
    const user = new User();
    user.name = profile.displayName;
    user.id = profile.id;
    user.gender = profile.gender;
    user.profileImage = profile._json.image.url;

    User.findOne({ id: profile.id }, (err, result) => {
        if (err) {
            done(new Error('Something went wrong'), null);
        } else if (result && result.id) {
            done(null, result)
        } else if (!user) {
            user.save((err, response) => {
                if (err) done(new Error('Something went wrong'), null);
                done(null, response);
            });
        }
    })
}));