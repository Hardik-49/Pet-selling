const express = require('express');
const router = express.Router();
const { createItem } = require('../controller/itemcontroller');
const itemController = require('../controller/itemcontroller');

// Route to create an item under a category or sub-category
router.post('/item', createItem);

// Route to get all items
router.get('/allitems', itemController.getAllItems);

// Route to get all items under a category
router.get('/items/:categoryId', itemController.getItemsByCategory);

// Route to get all items under a sub-category
router.get('/items/sub/:subcategoryId', itemController.getItemsBySubCategory);

// Route to get an item by ID or name
router.get('/item/:idorname', itemController.getItemByIdOrName);

// Route to edit a sub-category
router.put('/item/:id', itemController.edititems);

//Route to search item
router.get('/itemsearch/search', itemController.searchItemByName);

module.exports = router;
