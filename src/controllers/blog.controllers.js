const BlogService = require("../services/blog.service");
const { SuccessResponse } = require("../core/success.response")


class BlogController {
    // Tạo bài viết mới
    static async createPost(req, res) {
                new SuccessResponse({
                message: "Sign Up Success",
                metadata: await BlogService.createPost(req.body)
            }).send(res)
    }
   
    // 📌 Lấy danh sách bài viết
    static async getPosts(req, res) {
        try {
            const { page, limit } = req.query;
            const result = await BlogService.getPosts({ page, limit });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Lay post bang id

    // xoa post = id
 
    // update post bang id
}

module.exports = BlogController;
