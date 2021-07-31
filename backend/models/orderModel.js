const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const orderSchema = mongoose.Schema({
    name: String,
    email: String,
    address: String,
    city: {type: String, default:''},
    state: {type: String, default:''},
    products: {type: Array , default: []},
    status: {type: String, default:'In-process'}
});

module.exports = mongoose.model('Order', orderSchema);
