const express = require('express');
const router = express.Router();
const {createSubcategory, getAllSubcategories, getSubcategoriesByCategory, getSubcategoryByIdOrName,editSubCategory } = require('../controller/subcategoryController');

router.post('/subcategory', createSubcategory);

// Route to get all sub-categories
router.get('/subcategories', getAllSubcategories);

// Route to get all sub-categories under a specific category
router.get('/subcategories/category/:categoryId', getSubcategoriesByCategory);

// Route to get a sub-category name
router.get('/subcategory/:idorname', getSubcategoryByIdOrName);


// Route to edit a sub-category
router.put('/subcategory/:id', editSubCategory);

module.exports = router;
