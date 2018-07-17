const express = require('express');
const route = express.Router();
const passport = require('passport');

route.get('/login', (req, res) => {
    res.send('login route');
});

route.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        req.logout();
        res.redirect("/");
        console.log(req.isAuthenticated());// returns true or false
    });
});

route.get('/login/google', passport.authenticate('google', {
    // scope defines which property we want to use, it takes array of string, for example 'email'
    scope: ['profile']
}));

route.get('/redirect', passport.authenticate('google', { failureRedirect: '/auth/login' }), (req, res) => {
    // we can now use the user object in req object
    console.log(req.isAuthenticated());// returns true or false
    res.redirect('/');
});

module.exports = route;