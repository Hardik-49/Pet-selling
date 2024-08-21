const Category = require('../models/category');

exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategoryByIdorName = async (req, res) => {
    const { name, id } = req.query;

    try {
        let item;
        if (id) {
            // Find by ID
            item = await Category.findById(id);
        } else if (name) {
            // Find by name
            item = await Category.findOne({ name });
        } else {
            return res.status(400).json({ message: 'Please provide either name or id' });
        }

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
