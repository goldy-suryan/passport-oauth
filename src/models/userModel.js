const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    id: String,
    gender: String,
    profileImage: String
}, { collection: 'users'});

module.exports = mongoose.model('User', UserSchema);