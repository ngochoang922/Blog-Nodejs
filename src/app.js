const express = require('express');
const app = express();
const router = require('./routers/index');
const path = require('path');
const cors = require('cors');


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors({
    origin: '*'
}))

// init database
require('./database/init.mongodb')

// init router
app.use('/', router)

// Serve static files từ thư mục public
app.use(express.static('public'));

// Route để trả về file HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


module.exports = app



