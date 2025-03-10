const PostService = require("../services/post.service");
const { SuccessResponse } = require("../core/success.response")


class PostController {
    // Tạo bài viết mới
    static async createPost(req, res) {
        new SuccessResponse({
            message: "Create Success",
            metadata: await PostService.createPost(req.body)
        }).send(res)
    }
   
    // 📌 Lấy danh sách bài viết
    static async getPosts(req, res) {
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
            console.log("Dữ liệu nhận từ body:", req.body); // Kiểm tra dữ liệu body gửi lên
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


