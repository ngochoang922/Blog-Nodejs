const express = require('express')
const app = express()
const router = require('./routers/index')
const path = require('path')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors({
    origin: '*'
}))

// init database
require('./database/init.mongodb')

// init router
app.use('/', router)

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    return next(err)
})

app.use((err, req, res, next) => {
    const statusCode = err.status || 500 //server
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: err.stack,
        message: err.message || 'Internal Server Error'
    })
})

module.exports = app



