const express = require('express');
const router = express.Router();
const friendsController = require('../../controllers/friendsController');

// POST a new friend to a user's friend list
router.post('/:userId/friends/:friendId', friendsController.addFriend);

// DELETE a friend from a user's friend list
router.delete('/:userId/friends/:friendId', friendsController.removeFriend);

module.exports = router;

