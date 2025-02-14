const express = require('express')
const router = express.Router()
const blogController = require('../../controllers/blog.controllers')

router.post('', blogController.createPost)
router.get('', blogController.getPosts);

module.exports = router
