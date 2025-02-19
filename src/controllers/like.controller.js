const { SuccessResponse } = require("../core/success.response")
const LikeService = require("../services/like.service")

class LikePostController{
    static togglelikePost = async (req, res, next) => {
        new SuccessResponse({
            message: "Like Post Success",
            metadata: await LikeService.togglelikePost(req.query)
        }).send(res)
    }

    static getLike = async (req, res, next) => {
        new SuccessResponse({
            message: "Get Like Success",
            metadata: await LikeService.getLikeCount(req.query)
        }).send(res)
    }
}

module.exports = LikePostController