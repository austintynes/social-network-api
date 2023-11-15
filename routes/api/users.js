const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //users schema
});

const User = mongoose.model('User', userSchema);

module.exports = User;



