const express = require('express');
const commentControllers = require('../controllers/commentController');
const authenticate = require('../middlewares/authenticate')


const router = express.Router();



router.post('/', authenticate, commentControllers.createComment)
router.delete('/', authenticate, commentControllers.deleteComment)


module.exports = router;