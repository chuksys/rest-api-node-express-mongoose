This is a template I developed to get started with REST-API development projects. Feel free to fork/clone.

### Technologies Used
----------------------

1. Database: MongoDB
2. ORM: Mongoose
3. Runtime: NODE
4. Framework: Express

### Instructions

1. Clone this repo into your local working dir
2. Install all dependencies. Run

```npm install
```

3. Create a config folder in your root directory and a file under config named keys.js. Inside keys.js, export an object with a key "mongoURI"; value should be the endpoint to your mongoDB instance, either on MongoDB Atlas or locally". For example

```module.exports = {
    mongoURI: encodeURI('mongodb+srv://username:password@*******************')
}
```
Note that this is only for development purposes. In production, this value should be an environment variable.

4. At this point, the API endpoints should work. Simply use postman to test these endpoints. 

##### Endpoints are:

*** @route GET api/items ***
*** @desc GET items ***

http://localhost:{port_number}/api/items



*** @route POST api/items ***
*** @desc Add new item. Pass new item name in request body ***

http://localhost:{port_number}/api/items


*** @route PUT api/items/:id ***
*** @desc Update existing item. Pass ID of item to update as a request parameter ***

http://localhost:{port_number}/api/items/{item_id}


*** @route DELETE api/items/:id ***
*** @desc Delete existing item. Pass ID of item to delete as a request parameter ***

http://localhost:{port_number}/api/items/{item_id}



