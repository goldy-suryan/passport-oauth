const express = require('express');
const route = express.Router();

route.get('/login', (req, res) => {
    res.send('login route');
});

route.get('/login/google', (req, res) => {
    res.send('logging using google+');
});

route.get('/redirect', (req, res) => {
    res.send('redirect uri');
});

module.exports = route;