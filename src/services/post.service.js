const slugify = require("slugify");
const Post = require("../models/post.model");
const mongoose = require("mongoose");
class PostService {
  
    static async createPost(postData) {
        try {
            if (!postData.post_slug) {
                postData.post_slug = generateSlug(postData.title); // Tạo slug từ tiêu đề
            }
    
            const newPost = await Post.create(postData);
            return newPost;
        } catch (error) {
            throw new Error(error.message || "Lỗi không xác định khi tạo bài viết");
        }
    };
    

    static async getPosts({ cursor , limit = 10 }) {
        try {
            console.log(`Cursor: ${cursor}, Limit: ${limit}`);
            const query = {}
            if(cursor){
                query._id = { $lt: cursor } // $lt: less than
            }

            const posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean()

            const nextCursor = posts.length ? posts[posts.length - 1]._id : null;

            return {
                data: posts,
                nextCursor: nextCursor
            }
        } catch (error) {
            throw new Error(`Get Post Error:: ${error.message}`);
        }
    }

    static async getPostById(id) {
        try {
            const post = await Post.findById(id).lean();
            if (!post) {
                throw new Error("Không tìm thấy bài viết");
            }
            return post;
        } catch (error) {
            console.error("Lỗi khi lấy bài viết:", error);
            throw new Error("Lỗi khi lấy bài viết");
        }
    }
    static async deletePost(id) {
        try {
            const post = await Post.findByIdAndDelete(id);
            if (!post) {
                throw new Error("Không tìm thấy bài viết để xóa");
            }
            return post;
        } catch (error) {
            console.error("Lỗi khi xóa bài viết:", error);
            throw new Error("Lỗi khi xóa bài viết");
        }
    }


static async updatePost(id, payload) {
    try {
        // Kiểm tra id có hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID không hợp lệ");
        }

        // Tạo slug tự động nếu không có
        if (!payload.post_slug && payload.post_title) {
            payload.post_slug = slugify(payload.post_title, { lower: true, strict: true });
        }

        // Kiểm tra slug có bị trùng không
        if (payload.post_slug) {
            let newSlug = payload.post_slug;
            let count = 1;
            while (await Post.exists({ post_slug: newSlug, _id: { $ne: id } })) {
                newSlug = `${payload.post_slug}-${count}`;
                count++;
            }
            payload.post_slug = newSlug;
        }

        // Cập nhật bài viết
        const post = await Post.findByIdAndUpdate(id, payload, { 
            new: true, 
            runValidators: true 
        }).lean();

        if (!post) {
            throw new Error("Không tìm thấy bài viết để cập nhật");
        }

        return post;
    } catch (error) {
        console.error("Lỗi khi cập nhật bài viết:", error);
        throw new Error(error.message || "Lỗi khi cập nhật bài viết");
    }

}
    static async findPostByTitle(title) {
        try {
            const post = await Post.findOne({ post_title: title }).lean();
            if (!post) {
                throw new Error("Không tìm thấy bài viết với tiêu đề này");
            }
            return post;
        } catch (error) {
            console.error("Lỗi khi tìm bài viết theo tiêu đề:", error);
            throw new Error("Lỗi khi tìm bài viết theo tiêu đề");
        }
    }

}
module.exports = PostService;

