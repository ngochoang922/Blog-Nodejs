const express = require('express')
const router = express.Router()
const CommentController = require('../../controllers/comment.controller')
const asyncHandler = require('../../helpers/asyncHandler')

router.post('', asyncHandler(CommentController.createComment))
router.get('', asyncHandler(CommentController.getComment))
router.delete('', asyncHandler(CommentController.deleteComment))

module.exports = router
