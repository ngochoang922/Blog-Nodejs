const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/blog.controllers');
// const xacThuc = require('../../middleware/auth');


router.post('', blogController.createPost);
// router.put('/:id', xacThuc, blogController.capNhatBaiViet);
// router.delete('/:id', xacThuc, blogController.xoaBaiViet);

module.exports = router;
