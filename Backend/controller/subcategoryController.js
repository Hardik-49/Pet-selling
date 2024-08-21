const Subcategory = require('../models/subcategory');
const Category = require('../models/category');


//function to create subcategory under category
exports.createSubcategory = async (req, res) => {
    const { categoryId, name, image, description, taxApplicability, tax } = req.body;

    try {
        // Check if the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Create the subcategory
        const subcategory = new Subcategory({
            name,
            image,
            description,
            taxApplicability,
            tax: taxApplicability ? tax : category.tax,  // Default to category tax if not provided
            categoryId
        });

        await subcategory.save();
        res.status(201).json(subcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//function to get all sub categories
exports.getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//function to get all subcategory  associated with a specific category,
exports.getSubcategoriesByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const subcategories = await Subcategory.find({ categoryId: categoryId });
        if (subcategories.length === 0) {
            return res.status(404).json({ message: 'No subcategories found for this category' });
        }
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//function to get retrieve a specific sub-category based on either its ID .
exports.getSubcategoryByIdOrName = async (req, res) => {
    const { name, id } = req.query;

    try {
        let item;
        if (id) {
            // Find by ID
            item = await Subcategory.findById(id);
        } else if (name) {
            // Find by name
            item = await Subcategory.findOne({ name });
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

// API to edit sub-category attributes
exports.editSubCategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subcategory) return res.status(404).json({ message: 'subCategory not found' });
        res.json(subcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};