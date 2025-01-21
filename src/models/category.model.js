const { Schema, model } = require("mongoose");
const DOCUMENT_NAME = "Category";
const COLLECTION_NAME = "categories";

const categorySchema = new Schema({
    category_name: { type: String, required: true },
    category_slug: { type: String, required: true, unique: true },
    category_description: { type: String }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, categorySchema);
