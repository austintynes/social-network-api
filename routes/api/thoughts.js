const mongoose = require('mongoose');

const thoughtsSchema = new mongoose.Schema({
    //thoughts schema
});

const Thoughts = mongoose.model('Thoughts', thoughtsSchema);

module.exports = Thoughts;