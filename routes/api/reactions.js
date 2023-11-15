const express = require('express');
const router = express.Router();
const reactionsController = require('../../controllers/reactionsController');

// POST a new reaction to a thought
router.post('/:thoughtId', reactionsController.createReaction);

// DELETE a reaction from a thought by its reactionId
router.delete('/:thoughtId/:reactionId', reactionsController.deleteReaction);

module.exports = router;
