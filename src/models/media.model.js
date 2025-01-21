const { Schema, model } = require("mongoose");
const DOCUMENT_NAME = "Media";
const COLLECTION_NAME = "media";

const mediaSchema = new Schema({
    media_uploaded_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    media_file_name: { type: String, required: true },
    media_file_url: { type: String, required: true },
    media_file_type: { type: String, required: true },
    media_file_size: { type: Number, required: true }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, mediaSchema);
