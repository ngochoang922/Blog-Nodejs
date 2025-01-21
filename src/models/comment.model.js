const { Schema, model } = require("mongoose");
const DOCUMENT_NAME = "Comment";
const COLLECTION_NAME = "comments";

const commentSchema = new Schema({
    comment_post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    comment_user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment_content: { type: String, required: true },
    comment_parent_id: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    comment_left: { type: Number, default: 0 },
    comment_right: { type: Number, default: 0 },
    comment_likes: { type: Number, default: 0 },
    is_deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, commentSchema);
