const Item = require('../models/item');
const Category = require('../models/category');
const Subcategory = require('../models/subcategory');

exports.createItem = async (req, res) => {
    const { name, image, description, taxApplicability, tax, baseAmount, discount, categoryId, subcategoryId } = req.body;

    try {
        let parent;
        if (categoryId) {
            // If categoryId is provided, ensure the category exists
            parent = await Category.findById(categoryId);
            if (!parent) {
                return res.status(404).json({ message: 'Category not found' });
            }
        } else if (subcategoryId) {
            // If subcategoryId is provided, ensure the subcategory exists
            parent = await Subcategory.findById(subcategoryId);
            if (!parent) {
                return res.status(404).json({ message: 'Subcategory not found' });
            }
        } else {
            return res.status(400).json({ message: 'Either categoryId or subcategoryId is required' });
        }

        // Calculate total amount
        const totalAmount = baseAmount - discount;

        // Create the item
        const item = new Item({
            name,
            image,
            description,
            taxApplicability,
            tax: taxApplicability ? tax : parent.tax,  // Default to parent (category/subcategory) tax if not provided
            baseAmount,
            discount,
            totalAmount,
            categoryId,
            subcategoryId,
        });

        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all items under a category
exports.getItemsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const items = await Item.find({ categoryId: categoryId });
        
        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found for this category' });
        }
        
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all items under a sub-category
exports.getItemsBySubCategory = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const items = await Item.find({ subcategoryId: subcategoryId });
        
        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found for this sub-category' });
        }
        
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an item by name or ID along with its attributes
exports.getItemByIdOrName = async (req, res) => {
    const { name, id } = req.query;

    try {
        let item;
        if (id) {
            // Find by ID
            item = await Item.findById(id);
        } else if (name) {
            // Find by name
            item = await Item.findOne({ name });
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

// API to edit items attributes
exports.edititems = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// API to search for an item by its name
exports.searchItemByName = async (req, res) => {
    try {
        const { name } = req.query; // Get the item name from query parameters
        
        // Find items where the name matches (case-insensitive)
        const items = await Item.find({ name: new RegExp(name, 'i') });

        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found with that name' });
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};