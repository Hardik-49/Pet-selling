created backend for the menu mangement as directed in the assignment
to first start with the project you can either clone it or download zip in your system

i have given node modules in the repo although its not a good practice to add node modules in git repo
if its not there proceed by  

npm install

npm start to start the project

also added db crendentails in env for ease start if its not working pls add your db details in .env file 

Now task was to create api for category, subcategory and items i have used model controller routes folder structure for this 

APIs link for testing in postman are bellow--

[[[Category-]]] 

to post a category--  Method POST  http://localhost:5000/api/category

json format

{
    "name": "Beverages",
    "image": "http://example.com/beverages.png",
    "description": "Various types of beverages",
    "taxApplicability": true,
    "tax": 5,
    "taxType": "Percentage"
}

to get all category--  Method GET  (http://localhost:5000/api/categories)

to get a category by id or name Method GET http://localhost:5000/api/category/items?name=Beverages   , http://localhost:5000/api/category/items?id=66bf35ccb80c147d38030e1b

to update a category Method PUT http://localhost:5000/api/category/66bf35ccb80c147d38030e1b

[[[Sub category--]]]

to post a Subcategory  Method POST http://localhost:5000/api/subcategory

josn format add category id as subcategory are under category

{
    "categoryId": "66bf3705b80c147d38030e23",
    "name": "Drinks 45",
    "image": "http://example.com/drinks.png",
    "description": "Various types of beveragesdsfdf",
    "taxApplicability": true,
    "tax": 5
}

to get all subcategory--  Method GET  (http://localhost:5000/api/subcategories)

to get  all sub-categories under a specific category--  Method GET  (http://localhost:5000/api/subcategories/category/:categoryId)

to get a subcategory by id or name Method GET http://localhost:5000/api/subcategory/items?name=Beverages   , http://localhost:5000/api/subcategory/items?id=66bf35ccb80c147d38030e1b

to update a subcategory Method PUT http://localhost:5000/api//subcategory/:id

[[items--]]]

post  an item under a category or sub-category method POST http://localhost:5000/api/item

json format give categoryid or subcategoryid

{
    "categoryId": "64b3c7eb342ed72c0c53a78d",
    "name": "Latte",
    "image": "http://example.com/latte.png",
    "description": "A delicious latte",
    "taxApplicability": true,
    "tax": 8,
    "baseAmount": 100,
    "discount": 10
}

to get all items--  Method GET  (http://localhost:5000/api/allitems)

to  get all items under a category--  Method GET  (http://localhost:5000/api/items/:categoryId)

to  get all items under a subcategory--  Method GET  (http://localhost:5000/api/items/sub/:subcategoryId)

to get a item by id or name Method GET http://localhost:5000/api/item/items?name=Beverages   , http://localhost:5000/api/item/items?id=66bf35ccb80c147d38030e1b

to update a Item Method PUT http://localhost:5000/api/item/:id

to search item Method GET  http://localhost:5000/api/item/search?name=Latte
