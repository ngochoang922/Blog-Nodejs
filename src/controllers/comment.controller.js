const { SuccessResponse } = require("../core/success.response")
const CommentService = require("../services/comment.service")

class CommentController{
    static createComment = async (req, res, next) => {
        new SuccessResponse({
            message: "Create Comment Success",
            metadata: await CommentService.createComment(req.body)
        }).send(res)
    }
}

module.exports = CommentController