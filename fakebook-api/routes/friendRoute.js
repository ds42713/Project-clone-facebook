const express = require('express');
const friendControllers = require('../controllers/friendController');
const authenticate = require('../middlewares/authenticate')


const router = express.Router();

router.get('/unknown', authenticate, friendControllers.getUnknown);
router.get('/',authenticate ,friendControllers.getAllFriends)
router.post('/',authenticate ,friendControllers.requestFriend)
router.patch('/:friendId',authenticate ,friendControllers.updateFriend) // 8000/friends?status=ACCEPTED&searchName=
router.delete('/:friendId',authenticate, friendControllers.deleteFriend)


module.exports = router;