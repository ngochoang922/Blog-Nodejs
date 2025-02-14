const slugify = require("slugify");
const Blog = require("../models/post.model");

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
}

module.exports = BlogService;

