const { Schema, model } = require("mongoose");
const DOCUMENT_NAME = "Post";
const COLLECTION_NAME = "posts";

const postSchema = new Schema({
    post_author_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post_content: { type: String, required: true },
    post_cover_image: { type: String },
    post_views: { type: Number, default: 0 },
    post_likes: { type: Number, default: 0 },
    post_user_likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    post_comments_count: { type: Number, default: 0 }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, postSchema);
