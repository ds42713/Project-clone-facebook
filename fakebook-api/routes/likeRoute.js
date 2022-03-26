const express = require('express');
const likeControllers = require('../controllers/likeController');
const authenticate = require('../middlewares/authenticate')


const router = express.Router();



router.post('/', authenticate, likeControllers.createLike)
router.delete('/', authenticate, likeControllers.deleteLike)


module.exports = router;