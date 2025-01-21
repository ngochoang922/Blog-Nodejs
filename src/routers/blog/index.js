const express = require('express')
const router = express.Router()
const blogController = require('../../controllers/blog.controllers')

router.post('', blogController.createPost)

module.exports = router
