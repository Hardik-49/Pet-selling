const express = require('express');
const router = express.Router();
const { createCategory, getCategories, getCategoryByIdorName, updateCategory } = require('../controller/categoryController');

router.post('/category', createCategory);
router.get('/categories', getCategories);
router.get('/category/:id', getCategoryByIdorName);
router.put('/category/:id', updateCategory);


module.exports = router;
