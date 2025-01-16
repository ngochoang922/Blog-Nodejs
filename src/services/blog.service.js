const Blog = require('../models/blog.model');

class BlogService {

    // get all 
    // static async getPosts() {
    //     try {
    //         const posts = await Blog.find();
    //         res.json(posts);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }

    // create
    static async createPost(payload) {
        try {
            const post = await Blog.create(payload);
            return post
        } catch (error) {
           console.log(error);
        }
    }

    // update
    // static async updatePost(payload) {
    //     try {
    //         const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    //         if (!post) return res.status(404).json({ error: 'Post not found' });
    //         res.json(post);
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // }

    // // delete
    // static async deletePost(blogId) {
    //     try {
    //         const post = await Blog.findByIdAndDelete(blogId);
    //         if (!post) return res.status(404).json({ error: 'Post not found' });
    //         res.json({ message: 'Post deleted successfully' });
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }
}

module.exports = BlogService;