const mongoose = require('mongoose');

const reactionsSchema = new mongoose.Schema({
    //reactions schema
});

const Reactions = mongoose.model('Reactions', reactionsSchema);

module.exports = Reactions;