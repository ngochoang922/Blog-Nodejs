const express = require('express')
const app = express()
const router = require('./routers/index')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// init database
require('./database/init.mongodb')

// init router
app.use('/', router)




module.exports = app



