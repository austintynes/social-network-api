const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    //friends schema
});

const Friends = mongoose.model('Friends', friendsSchema);

module.exports = Friends;