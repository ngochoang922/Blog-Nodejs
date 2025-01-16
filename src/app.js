const express = require('express')
const app = express();
const Router = express.Router()

require('./database/init.mongodb')

Router.use(require('./routers/index'))

module.exports = app



