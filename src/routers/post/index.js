const express = require('express')
const router = express.Router()
const PostController = require('../../controllers/post.controllers')

router.get('', PostController.getPosts);
router.post('', PostController.createPost)
router.get('/:id', PostController.getPostById)
router.delete('/', PostController.deletePost)
router.put('/:id', PostController.updatePost)
router.post('/find', PostController.findPostByTitle);

module.exports = router

