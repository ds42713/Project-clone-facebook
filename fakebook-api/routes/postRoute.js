const express = require('express');
const postControllers = require('../controllers/postController');
const authenticate = require('../middlewares/authenticate')
const upload = require("../middlewares/upload")

const router = express.Router();


router.get('/', authenticate, postControllers.getAllPost)
router.post('/', authenticate, upload.single('img'), postControllers.createPost)
router.delete('/:id', authenticate, postControllers.deletePost)

module.exports = router;