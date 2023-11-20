// User.js models
const mongoose = require("mongoose");

//reaction schema
const reactionSchema = new mongoose.Schema({
  reactions: [
    {
      reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      reactionBody: {
        type: String, 
        required: true,
        maxLength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      CreatedAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toISOString(),
      },
    },
  ],
});


module.exports = reactionSchema;
