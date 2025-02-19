const { BadRequestError } = require('../core/error.response');
const Post = require('../models/post.model');
const User = require('../models/user.model');

class LikeService {
    static async getLikeCount({postId}){
        return await Post.findOne(
            { _id: postId },
            "post_likes"
        ).lean()
    }

    static async togglelikePost({
        postId, userId
    }){
        const foundPost = await Post.findOne({ _id: postId })
        if(!foundPost) throw new BadRequestError('Post not found')

        const foundUser = await User.findOne({ _id: userId })
        if(!foundUser) throw new BadRequestError('User not found')

        let updatePost
        if(!foundPost.post_user_likes.includes(userId)){
            updatePost = await Post.findOneAndUpdate(
                { _id: postId },
                { 
                    $push: { post_user_likes: userId },
                    $inc: { post_likes: +1 }
                },
                { new: true }
            )
        }else{
            updatePost = await Post.findOneAndUpdate(
                { _id: postId },
                { 
                    $pull: { post_user_likes: userId },
                    $inc: { post_likes: -1 }
                },
                { new: true }
            )
        }

        return updatePost
    }
}

module.exports = LikeService