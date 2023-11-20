const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');

// Create a new user
router.post('/', usersController.createUser);

// Get all users
router.get('/', usersController.getAllUsers);

// Get user by ID
router.get('/:userId', usersController.getUserID);

// Update a user by ID
router.put('/:userId', usersController.updateUser);

// Delete a user by ID
router.delete('/:userId', usersController.deleteUser);

module.exports = router;




