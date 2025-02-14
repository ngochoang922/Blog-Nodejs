const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');

class CommentService{
    static async createComment({
        postId, userId, content, commentParentId, 
    }){
        // check postid exist
        const foundPost = await Post.findOne({ _id: postId });
        if(!foundPost) throw new Error('Post not found');

        // check userId exist
        const foundUser = await User.findOne({ _id: userId });
        if(!foundUser) throw new Error('User not found');

        if(content === '' || content.length == 0) throw new Error('Content is empty');

        // create Comment
        const comment = await Comment.create({
            comment_post_id: postId,
            comment_user_id: userId,
            comment_content: content,
            comment_parent_id: commentParentId
        })

        let rightValue
        if(commentParentId){
            const commentParent = await Comment.findOne({ _id: commentParentId })
            if(!commentParent) throw new Error('Comment parent not found')

            rightValue = commentParent.comment_right

            await Comment.updateMany({
                comment_post_id: postId,
                comment_right: { $gte: rightValue }
            }, {
                $inc: { comment_right: 2 }
            })

            await Comment.updateMany({
                comment_post_id: postId,
                comment_left: { $gt: rightValue }
            }, {
                $inc: { comment_left: 2 }
            })
        }else{
            const maxRightValue = await Comment.findOne({
                comment_post_id: postId
            }, 'comment_right')
            .sort({ comment_right: -1 })
            
            if(maxRightValue){
                rightValue = maxRightValue ? maxRightValue.comment_right + 1 : 1;
            }else{
                rightValue = 1
            }
        }

        comment.comment_left = rightValue
        comment.comment_right = rightValue + 1
        await comment.save()

        return comment
    }
}

module.exports = CommentService;