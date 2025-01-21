'use strict'

const express = require('express')
const router = express.Router()

// access
// router.use('/api/acesss', require('./access/index'))

// blog
router.use('/v1/api/blog', require('./blog/index'))
router.use('/v1/api/access', require('./access/index'))

module.exports = router