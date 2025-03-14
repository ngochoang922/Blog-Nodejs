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
        const { cursor, limit } = req.query;
        new SuccessResponse({
            message: "Get All Post Success",
            metadata: await PostService.getPosts({ cursor, limit })
        }).send(res)
    }

    // Lay post bang id
    static async getPostById(req, res) {
        const { id } = req.params;
        new SuccessResponse({
            message: "Get Post By Id Success",
            metadata: await PostService.getPostById(id)
        }).send(res)
    }

    // xoa post = id
    static async deletePost(req, res) {
        new SuccessResponse({
            message: "Delete Success",
            metadata: await PostService.deletePost(req.query.id)
        }).send(res)
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


