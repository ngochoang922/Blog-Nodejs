const { BadRequestError, NotFoundError } = require("../core/error.response");
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const { ObjectId } = require('mongoose');

class CommentService {
  static async createComment({ postId, userId, content, commentParentId }) {
    // check postid exist
    const foundPost = await Post.findOne({ _id: postId });
    if (!foundPost) throw new NotFoundError("Post not found");

    // check userId exist
    const foundUser = await User.findOne({ _id: userId });  
    if (!foundUser) throw new NotFoundError("User not found");

    if (content === "" || content.length == 0)
      throw new NotFoundError("Content is empty");

    // create Comment
    const comment = await Comment.create({
      comment_post_id: postId,
      comment_user_id: userId,
      comment_content: content,
      comment_parent_id: commentParentId,
    });

    let rightValue;
    if (commentParentId) {
      const commentParent = await Comment.findOne({ _id: commentParentId });
      if (!commentParent) throw new NotFoundError("Comment parent not found");

      rightValue = commentParent.comment_right;

      await Comment.updateMany(
        {
          comment_post_id: postId,
          comment_right: { $gte: rightValue },
        },
        {
          $inc: { comment_right: 2 },
        }
      );

      await Comment.updateMany(
        {
          comment_post_id: postId,
          comment_left: { $gt: rightValue },
        },
        {
          $inc: { comment_left: 2 },
        }
      );
    } else {
      const maxRightValue = await Comment.findOne(
        {
          comment_post_id: postId,
        },
        "comment_right"
      ).sort({ comment_right: -1 });

      if (maxRightValue) {
        rightValue = maxRightValue ? maxRightValue.comment_right + 1 : 1;
      } else {
        rightValue = 1;
      }
    }

    comment.comment_left = rightValue;
    comment.comment_right = rightValue + 1;
    await comment.save();

    return comment;
  }

  static async deleteComment({ postId, commentId }) {
    const foundPost = await Post.findOne({ _id: postId });
    if (!foundPost) throw new NotFoundError("Post not found");

    const foundComment = await Comment.findOne({ _id: commentId });
    if (!foundComment) throw new NotFoundError("Comment not found");

    const { comment_left, comment_right } = foundComment;

    const width = comment_right - comment_left + 1;

    await Comment.deleteMany({
      comment_post_id: postId,
      comment_left: { $gte: comment_left },
      comment_right: { $lte: comment_right },
    });

    await Comment.updateMany(
      {
        comment_post_id: postId,
        comment_right: { $gt: comment_right },
      },
      {
        $inc: { comment_right: -width },
      }
    );

    await Comment.updateMany(
      {
        comment_post_id: postId,
        comment_left: { $gt: comment_right },
      },
      {
        $inc: { comment_left: -width },
      }
    );
  }
  
  static async getCommentByParentId({
    postId,
    commentParentId = null,
    limit = 50,
    skip = 0,
  }) {
    if(commentParentId){
        const parent = await Comment.findOne({ _id: commentParentId })
        if(!parent) throw new NotFoundError('Comment not found')

        const comment = await Comment.find({
            comment_post_id: postId,
            comment_left: { $gt: parent.comment_left },
            comment_right: { $lte: parent.comment_right }
        })
        .select({
          comment_left: 1,
          comment_right: 1,
          comment_content: 1,
          comment_parent_id: 1
        })
        .populate("comment_user_id", "fullname profile.avatar")
        .sort({ comment_left: 1})
        .limit(limit)
        .skip(skip)

        return comment
    }else{
      const comment = await Comment.find({
        comment_post_id: postId,
        comment_parent_id: null
      })
      .select({
        comment_left: 1,
        comment_right: 1,
        comment_content: 1,
        comment_parent_id: 1,
        comment_user_id: 1
      })
      .populate("comment_user_id", "fullname profile.avatar")
      .sort({ comment_left: 1})
      .limit(limit)
      .skip(skip)

      return comment
    }
  }
}

module.exports = CommentService;
