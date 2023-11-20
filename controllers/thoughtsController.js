// Import the Thought model
const Thought = require('../models/Thought');
const User = require('../models/User')
// Controller function to get all thoughts
async function getAllThoughts(req, res) {
  try {
    // Fetch all thoughts from the database
    const thoughts = await Thought.find();

    // Send a success response with the array of thoughts
    res.status(200).json(thoughts);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to retrieve thoughts' });
  }
}

// Controller function to get a single thought by its ID
async function getThoughtById(req, res) {
  try {
    // Extract thought ID from the request parameters
    const { thoughtId } = req.params;

    // Find the thought by ID in the database
    const thought = await Thought.findById(thoughtId);

    // Check if the thought exists
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Send a success response with the thought object
    res.status(200).json(thought);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to retrieve thought' });
  }
}

// Controller function to create a new thought
async function createThought(req, res) {
  try {
    // Extract thought data from the request body
    const { thoughtText, username, userId } = req.body;

    // Create a new thought instance
    const newThought = new Thought({
      thoughtText,
      username,
    });

    // Save the new thought to the database
    const thought = await newThought.save();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: {thoughts: thought._id} },
      { new: true }
    );

    // Send a success response with the created thought object
    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error)
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to create a new thought' });
  }
}

// Controller function to update a thought by ID
async function updateThought(req, res) {
  try {
    // Extract thought ID and updated data from the request parameters and body
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;

    // Find the thought by ID and update its information
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true }
    );

    // Check if the thought exists
    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Send a success response with the updated thought object
    res.status(200).json(updatedThought);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to update thought' });
  }
}

// Controller function to delete a thought by ID
async function deleteThought(req, res) {
  try {
    // Extract thought ID from the request parameters
    const { thoughtId } = req.params;

    // Find the thought by ID and remove it from the database
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);

    // Check if the thought exists
    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    // Send a success response with the deleted thought object
    res.status(200).json(deletedThought);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: 'Failed to delete thought' });
  }
}

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
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
};
