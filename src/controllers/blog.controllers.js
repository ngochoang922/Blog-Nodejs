const BlogService = require("../services/blog.service");
const { SuccessResponse } = require("../core/success.response")


class BlogController {
    // Tạo bài viết mới
    static async createPost(req, res) {
                new SuccessResponse({
                message: "Create Success",
                metadata: await BlogService.createPost(req.body)
            }).send(res)
    }
   
    // 📌 Lấy danh sách bài viết
    static async getPosts(req, res) {
        new SuccessResponse({
            message: "Get Success",
            metadata: await BlogService.getPosts(req.query)
        }).send(res)
    }

    // Lay post bang id
    static async getPostById(req, res) {
        new SuccessResponse({
            message: "Get Success",
            metadata: await BlogService.getPostById(req.params.id)
        }).send(res)
    }

    // xoa post = id
    static async deletePost(req, res) {
        new SuccessResponse({
            message: "Delette success",
            metadata: await BlogService.deletePost(req.params.id)
        }).send(res)
    }
    // update post bang id
    static async updatePost(req, res) {
        new SuccessResponse({
            message: "Update success",
            metadata: await BlogService.updatePost(req.params.id, req.body)
        }).send(res)
    }
    static async findPostByTitle(req, res) {
        try {
            console.log("Dữ liệu nhận từ body:", req.body);
            const { title } = req.body;
    
            if (!title) {
                return res.status(400).json({ error: "Thiếu tiêu đề bài viết" });
            }
    
            const result = await BlogService.findPostByTitle(title);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = BlogController;


