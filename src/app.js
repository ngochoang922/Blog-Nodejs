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

module.exports = app



