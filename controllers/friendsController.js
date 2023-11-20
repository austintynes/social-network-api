// Import the User model
const User = require("../models/User");

// Controller function to add a new friend to a user's friend list
async function addFriend(req, res) {
  try {
    // Extract user ID and friend ID from the request parameters
    const { userId, friendId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the friend by ID
    const friend = await User.findById(friendId);

    // Check if the friend exists
    if (!friend) {
      return res.status(404).json({ error: "Friend not found" });
    }

    // Check if the user is already friends with the friend
    if (user.friends.includes(friendId)) {
      return res
        .status(400)
        .json({ error: "User is already friends with this user" });
    }

    // Add the friend to the user's friend list
    user.friends.push(friendId);

    // Save the updated user
    await user.save();

    // Send a success response with the updated user object
    res.status(200).json(user);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: "Failed to add friend" });
  }
}

// Controller function to remove a friend from a user's friend list
async function removeFriend(req, res) {
  try {
    // Extract user ID and friend ID from the request parameters
    const { userId, friendId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is friends with the friend
    if (!user.friends.includes(friendId)) {
      return res
        .status(400)
        .json({ error: "User is not friends with this user" });
    }

    // Remove the friend from the user's friend list
    user.friends.pull(friendId);

    // Save the updated user
    await user.save();

    // Send a success response with the updated user object
    res.status(200).json(user);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: "Failed to remove friend" });
  }
}

module.exports = {
  addFriend,
  removeFriend,
};

// async addFriend(req, res) {
//   try {
//     const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });

//     if (!dbUserData) {
//       return res.status(404).json({ message: 'No user with this id!' });
//     }

//     res.json(dbUserData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// },

// remove friend from friend list
// async removeFriend(req, res) {
//   try {
//     const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });

//     if (!dbUserData) {
//       return res.status(404).json({ message: 'No user with this id!' });
//     }

//     res.json(dbUserData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// },
// Add reaction
// async addReaction(req, res) {
//   try {
//     const dbThoughtData = await Thought.findOneAndUpdate(
//       { _id: req.params.thoughtId },
//       { $addToSet: { reactions: req.body } },
//       { runValidators: true, new: true }
//     );

//     if (!dbThoughtData) {
//       return res.status(404).json({ message: 'No thought with this id!' });
//     }

//     res.json(dbThoughtData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// },
// remove reaction from a thought
// async removeReaction(req, res) {
//   try {
//     const dbThoughtData = await Thought.findOneAndUpdate(
//       { _id: req.params.thoughtId },
//       { $pull: { reactions: { reactionId: req.params.reactionId } } },
//       { runValidators: true, new: true }
//     );

//     if (!dbThoughtData) {
//       return res.status(404).json({ message: 'No thought with this id!' });
//     }

//     res.json(dbThoughtData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// },
