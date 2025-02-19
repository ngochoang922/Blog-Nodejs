const express = require('express')
const router = express.Router()
const BlogController = require('../../controllers/blog.controllers')

router.get('', BlogController.getPosts);
router.post('', BlogController.createPost)

module.exports = router
