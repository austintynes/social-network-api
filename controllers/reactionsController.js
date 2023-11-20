// Import the Thought model
const Thought = require('../models/Thought');

// Controller function to create a new reaction to a thought
async function createReaction(req, res) {
  try {
    // Extract thought ID and reaction data from the request parameters and body
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    // Find the thought by ID
    const thought = await Thought.findById(thoughtId);

    // Check if the thought exists
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Add the new reaction to the thought's reactions array
    thought.reactions.push({ reactionBody, username });

    // Save the updated thought
    const updatedThought = await thought.save();

    // Send a success response with the updated thought object
    res.status(201).json(updatedThought);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to create a reaction' });
  }
}

// Controller function to delete a reaction from a thought by its reactionId
async function deleteReaction(req, res) {
  try {
    // Extract thought ID and reaction ID from the request parameters
    const { thoughtId, reactionId } = req.params;

    // Find the thought by ID
    const thought = await Thought.findById(thoughtId);

    // Check if the thought exists
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Find the index of the reaction to be deleted
    const reactionIndex = thought.reactions.findIndex(
      (reaction) => reaction._id.toString() === reactionId
    );

    // Check if the reaction exists
    if (reactionIndex === -1) {
      return res.status(404).json({ error: 'Reaction not found' });
    }

    // Remove the reaction from the thought's reactions array
    thought.reactions.splice(reactionIndex, 1);

    // Save the updated thought
    const updatedThought = await thought.save();

    // Send a success response with the updated thought object
    res.status(200).json(updatedThought);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to delete reaction' });
  }
}

module.exports = {
  createReaction,
  deleteReaction,
};
