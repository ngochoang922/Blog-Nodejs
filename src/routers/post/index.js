const express = require('express')
const router = express.Router()
const PostController = require('../../controllers/post.controllers')
const asyncHandler = require('../../helpers/asyncHandler')

router.get('',  asyncHandler(PostController.getPosts))
router.post('', asyncHandler(PostController.createPost))
router.get('/:id',  asyncHandler(PostController.getPostById))
router.delete('/',  asyncHandler(PostController.deletePost))
router.put('/:id',  asyncHandler(PostController.updatePost))
router.get('/search/:keyword',  asyncHandler(PostController.searchPost))

module.exports = router

