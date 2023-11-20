const express = require('express');
const router = express.Router();

const friendsRoutes = require('./api/friends.js');
const reactionsRoutes = require('./api/reactions.js');
const thoughtsRoutes = require('./api/thoughts.js');
const usersRoutes = require('./api/users.js');

router.use('/friends', friendsRoutes);
router.use('/reactions', reactionsRoutes);
router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);

module.exports = router;