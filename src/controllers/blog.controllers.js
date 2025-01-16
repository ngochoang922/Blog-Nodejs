const BlogService = require('../services/blog.service');

class BlogController {
    async createPost(req, res) {
        try {
            const post = await BlogService.createPost(req.body);
            res.status(201).json(post);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // async updatePost(req, res) {
    //     try {
    //         const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    //         if (!post) return res.status(404).json({ error: 'Post not found' });
    //         res.json(post);
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // }

    // async deletePost(req, res) {
    //     try {
    //         const post = await Blog.findByIdAndDelete(req.params.id);
    //         if (!post) return res.status(404).json({ error: 'Post not found' });
    //         res.json({ message: 'Post deleted successfully' });
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }
}

module.exports = new BlogController();
