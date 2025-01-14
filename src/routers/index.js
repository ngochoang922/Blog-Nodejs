'use strict'

const express = require('express')
const router = express.Router()

// access
router.use('/api/acesss', require('./access/index'))

// blog
router.use('/api/blog', require('./blog/index'))