var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 64
    },
    department: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [1, "Minimum Price should be 1"],
        max: 20000
    },
    discountPrice: {
        type: Number,
        required: true,
        min: 0,
        max: [20000, "Discounted Price should be less than or equal to price."]
    },
    image: {
        type: String
    },
    description: {
        type: String,
        min:20
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model
    ('Product', productSchema);