const slugify = require("slugify");
const Blog = require("../models/post.model");
const mongoose = require("mongoose");
class BlogService {
  
    static async createPost(payload) {
        try {
            // Tạo slug tự động nếu không có
            if (!payload.post_slug) {
                payload.post_slug = slugify(payload.post_title, { lower: true, strict: true });
            }

            // Kiểm tra xem slug có bị trùng không
            let newSlug = payload.post_slug;
            let count = 1;
            while (await Blog.exists({ post_slug: newSlug })) {
                newSlug = `${payload.post_slug}-${count}`;
                count++;
            }

            // Gán slug cuối cùng
            payload.post_slug = newSlug;

            // Lưu bài viết vào database
            const post = await Blog.create(payload);
            return post;
        } catch (error) {
            console.error("Lỗi khi tạo bài viết:", error);
            throw new Error(error.message || "Lỗi không xác định khi tạo bài viết");
        }
    }

    static async getPosts({ page = 1, limit = 10 }) {
        try {
            page = parseInt(page);
            limit = parseInt(limit);
            const skip = (page - 1) * limit;

            // Lấy tổng số bài viết
            const totalPosts = await Blog.countDocuments();

            // Lấy danh sách bài viết có phân trang
            const posts = await Blog.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();

            return {
                totalPosts,
                totalPages: Math.ceil(totalPosts / limit),
                currentPage: page,
                posts,
            };
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bài viết:", error);
            throw new Error("Lỗi khi lấy danh sách bài viết");
        }
    }

    static async getPostById(id) {
        try {
            const post = await Blog.findById(id).lean();
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
            const post = await Blog.findByIdAndDelete(id);
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
            while (await Blog.exists({ post_slug: newSlug, _id: { $ne: id } })) {
                newSlug = `${payload.post_slug}-${count}`;
                count++;
            }
            payload.post_slug = newSlug;
        }

        // Cập nhật bài viết
        const post = await Blog.findByIdAndUpdate(id, payload, { 
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
            const post = await Blog.findOne({ post_title: title }).lean();
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
module.exports = BlogService;

