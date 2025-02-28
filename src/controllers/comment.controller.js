const { SuccessResponse } = require("../core/success.response")
const CommentService = require("../services/comment.service")

class CommentController{
    static createComment = async (req, res, next) => {
        new SuccessResponse({
            message: "Create Comment Success",
            metadata: await CommentService.createComment(req.body)
        }).send(res)
    }

    static getComment = async (req, res, next) => {
        new SuccessResponse({
            message: "Get Comment Success",
            metadata: await CommentService.getCommentByParentId(req.query)
        }).send(res)
    }

    static deleteComment = async (req, res, next) => {
        new SuccessResponse({
            message: "Delete Comment Success",
            metadata: await CommentService.deleteComment(req.query)
        }).send(res)
    }
}

module.exports = CommentController