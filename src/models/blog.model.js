const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: [String],
    keywords: [String],
    status: {
        type: String,
        enum: ['draft', 'published'], 
        default: 'draft' 
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Blog', blogSchema);
