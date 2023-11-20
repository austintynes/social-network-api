// Import the User model
const User = require("../models/User");

// Create a new user
async function createUser(req, res) {
  try {
    //extract user data from request body
    const { username, email } = req.body;
    //create a new user
    const newUser = new User({
      username,
      email,
    });

    //save new user to database
    const user = await newUser.save();

    //send success response
    res.status(201).json(user);
  } catch (error) {
    //handle errors and response to errors
    res.status(500).json({ error: "Failed to create a new user" });
  }
}

// Get all users
async function getAllUsers(req, res) {
  try {
    //fetch all users
    const users = await User.find();

    //send success response with array of users
    res.status(200).json(users);
  } catch (error) {
    //handle errors and response to errors
    res.status(500).json({ error: "Failed to retrieve users" });
  }
}

//Get user by ID 
async function getUserID(req, res) {
  try {
    // Extract thought ID from the request parameters
    const { userId } = req.params;

    // Find the thought by ID in the database
    const user = await User.findById(userId);
    // Check if the thought exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
}

// Update a user by ID
async function updateUser(req, res) {
  try {
    //extract userID and updated data from req parameters and body
    const { userId } = req.params;
    const { username, email } = req.body;

    //find user by ID and update their info
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    );

    //check if user exists
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    //send a success response with updated user object
    res.status(200).json(updatedUser);
  } catch (error) {
    //handle errors and error response
    res.status(500).json({ error: "Failed to update user" });
  }
}

// Delete a user by ID
async function deleteUser(req, res) {
  try {
    //extract user ID from request params
    const { userId } = req.params;

    //find user by ID and remove
    const deletedUser = await User.findByIdAndDelete(userId);

    //check if user exists
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // send success response with deleted user object
    res.status(200).json(deletedUser);
  } catch (error) {
    //handle errors and error response
    console.log(error)
    res.status(500).json({ error: "Failed to delete user" });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserID,
  updateUser,
  deleteUser,
};
