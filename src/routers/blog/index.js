const express = require('express')
const router = express.Router()
const BlogController = require('../../controllers/blog.controllers')

router.get('', blogController.getPosts);
router.post('', BlogController.createPost)

module.exports = router
