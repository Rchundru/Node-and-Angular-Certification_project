const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    streetAddress: {type: String, default:''},
    city: {type: String, default:''},
    state: {type: String, default:''},
    zipCode: {type: String, default:''},
    userAccess: {type: String, default:'customer'}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);