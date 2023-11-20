// User.js models
const mongoose = require('mongoose');

    //user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    thoughts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Thought'
    }]

});


const User = mongoose.model('User', userSchema);

module.exports = User;



