const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    taxApplicability: { type: Boolean, required: true },
    tax: { type: Number, required: function() { return this.taxApplicability; }},
    baseAmount: { type: Number, required: true },
    discount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: false },
});

module.exports = mongoose.model('Item', itemSchema);
