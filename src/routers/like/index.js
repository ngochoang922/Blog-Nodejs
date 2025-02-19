const express = require('express')
const router = express.Router()
const LikeController = require('../../controllers/like.controller')
const asyncHandler = require('../../helpers/asyncHandler')

router.post('', asyncHandler(LikeController.togglelikePost))
router.get('', asyncHandler(LikeController.getLike))

module.exports = router
