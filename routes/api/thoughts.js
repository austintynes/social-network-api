const express = require('express');
const router = express.Router();
const thoughtsController = require('../../controllers/thoughtsController');

// GET all thoughts
router.get('/', thoughtsController.getAllThoughts);

// GET a single thought by its ID
router.get('/:thoughtId', thoughtsController.getThoughtById);

// POST a new thought
router.post('/', thoughtsController.createThought);

// PUT (update) a thought by its ID
router.put('/:thoughtId', thoughtsController.updateThought);

// DELETE a thought by its ID
router.delete('/:thoughtId', thoughtsController.deleteThought);

// POST a new reaction to a thought
router.post('/:thoughtId/reactions', thoughtsController.createReaction);

// DELETE a reaction from a thought by its reactionId
router.delete('/:thoughtId/reactions/:reactionId', thoughtsController.deleteReaction);

module.exports = router;
