const express = require('express');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const authRoute = require('./src/routes/authRoute');
const app = express();

// Database connection
mongoose.connect('mongodb://localhost:27017/passport-oauth', { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.set('views', './src/views')

app.disable('x-powered-by');
app.use((req, res, next) => {
    res.header('Allow-Access-Control-Origin', '*');
    res.header('Allow-Access-Control-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
        res.status(200);
    }
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Passport-OAuth',
        url: [{ title: "Login with google", redirect: '/auth/login/google' },
        { title: 'Login', redirect: '/auth/login' }]
    });
})
app.use('/auth', authRoute);

// Error handeling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`http://localhost:${port}`);
});