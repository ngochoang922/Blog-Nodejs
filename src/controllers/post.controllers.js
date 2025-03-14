const PostService = require("../services/post.service");
const { SuccessResponse } = require("../core/success.response")


class PostController {
    // Tạo bài viết mới
    static async createPost(req, res) {
                new SuccessResponse({
                message: "Create Success",
                metadata: await BlogService.createPost(req.body)
            }).send(res)

        new SuccessResponse({
            message: "Create Success",
            metadata: await PostService.createPost(req.body)
        }).send(res)
    }
   
    // 📌 Lấy danh sách bài viết
    static async getPosts(req, res) {
        new SuccessResponse({
            message: "Get Success",
            metadata: await BlogService.getPosts(req.query)
        }).send(res)
        try {
            const { cursor, limit } = req.query;
            const result = await PostService.getPosts({ cursor, limit });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Lay post bang id
    static async getPostById(req, res) {
        new SuccessResponse({
            message: "Get Success",
            metadata: await BlogService.getPostById(req.params.id)
        }).send(res)
        try {
            const { id } = req.params;
            const result = await PostService.getPostById(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
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
        try {
            const { id } = req.params;
            const result = await PostService.deletePost(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    // update post bang id
    static async updatePost(req, res) {
        try {
            const { id } = req.params;
            const payload = req.body;
            const result = await PostService.updatePost(id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    static async findPostByTitle(req, res) {
        try {
            console.log("Dữ liệu nhận từ body:", req.body);
            const { title } = req.body;
    
            if (!title) {
                return res.status(400).json({ error: "Thiếu tiêu đề bài viết" });
            }
    
            const result = await PostService.findPostByTitle(title);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PostController;


