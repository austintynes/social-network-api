// User.js models
const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    //user schema

});

const User = mongoose.model('User', userSchema);

module.exports = User;