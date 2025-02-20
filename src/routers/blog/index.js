const express = require('express')
const router = express.Router()
const BlogController = require('../../controllers/blog.controllers')

router.get('', BlogController.getPosts);
router.post('', BlogController.createPost)
router.get('/:id', BlogController.getPostById)
router.delete('/:id', BlogController.deletePost)
router.put('/:id', BlogController.updatePost)
router.post('/find', BlogController.findPostByTitle);

module.exports = router

