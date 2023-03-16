// app.js
var path = require('path');

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
//app.use(express.static(path.join(__dirname, 'public')))
PORT        = 9274;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

//  Main route
app.get('/', function(req, res)
    {
        res.render('index')
    });

// Shopper routes
app.get('/shoppers', function(req, res)
{
    // shopper_id, username, password, first_name, last_name, email, phone_number
    let query1 = "SELECT * FROM Shoppers;";

    db.pool.query(query1, function(error, rows, fields){
        
        let shoppers = rows;
        return res.render('shoppers', {data: shoppers});
    })
});

app.post('/add-shopper-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Shoppers (username, password, first_name, last_name, email, phone_number) VALUES ('${data.username}', '${data.password}', '${data.first_name}', '${data.last_name}', '${data.email}', '${data.phone_number}');`;

    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on ClothingItems_Orders
            // query2 = "SELECT * FROM ClothingItems_Orders;";
            query2 = "SELECT * FROM Shoppers;"
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/put-shopper-ajax', function(req,res,next){
    let data = req.body;
    // let username = parseInt(data.username);
    // let password = parseInt(data.password);
    // let first_name = parseInt(data.first_name);
    // let last_name = parseInt(data.last_name);
    // let email = parseInt(data.email);
    // let phone_number = parseInt(data.phone_number);
    // let shopper = parseInt(data.shopper);
  
    let query1 = `UPDATE Shoppers SET username = '${data.username}', password = '${data.password}', first_name = '${data.first_name}' , last_name = '${data.last_name}', email = '${data.email}', phone_number = '${data.phone_number}' WHERE shopper_id = '${data.full_name}';`
    let query2 = `SELECT * FROM Shoppers WHERE shopper_id = '${data.full_name}';`
  
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else
        {
            // Run the second query
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    console.log("row sending " + rows);
                    res.send(rows);
                }
            })
        }
  })});

app.delete('/delete-shopper-ajax/', function(req,res,next){
    let data = req.body;
    let shopperID = parseInt(data.shopper_id);
    let query1 = `DELETE FROM Shoppers WHERE shopper_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(query1, [shopperID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              
              else
              {
                res.sendStatus(204);
              }
  })});

// Seller routes
app.get('/sellers', function(req, res)
{
    // shopper_id, username, password, first_name, last_name, email, phone_number
    let query1 = "SELECT * FROM Sellers;";

    db.pool.query(query1, function(error, rows, fields){
        
        let sellers = rows;
        return res.render('sellers', {data: sellers});
    })
});

app.post('/add-sellers-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Sellers (username, password, shop_name, email, phone_number) VALUES ('${data.username}', '${data.password}', '${data.shop_name}', '${data.email}', '${data.phone_number}');`;

    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on ClothingItems_Orders
            // query2 = "SELECT * FROM ClothingItems_Orders;";
            query2 = "SELECT * FROM Sellers;"
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Clothing item routes
app.get('/clothing_items', function(req, res)
{
    let clothing_item_query = "SELECT * FROM ClothingItems";
    let seller_query = "SELECT * FROM Sellers;";

    db.pool.query(clothing_item_query, function(error, rows, fields){
        let items = rows;

        db.pool.query(seller_query, function(error, rows, fields){
            let sellers = rows;

            return res.render('clothing_items', {data: items, sellers: sellers});
        })
    })
});

app.post('/add-clothing-item-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO ClothingItems (clothing_type, color, size, brand, item_condition, current_price, quantity, is_available, seller_id) VALUES ('${data.clothing_type}', '${data.color}', '${data.size}', '${data.brand}', '${data.item_condition}', '${data.current_price}', '${data.quantity}', '${data.is_available}', '${data.seller_id}');`;

    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on ClothingItems_Orders
            // query2 = "SELECT * FROM ClothingItems_Orders;";
            query2 = "SELECT * FROM ClothingItems;"
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Order routes
app.get('/orders', function(req, res)
{
    let order_query = "SELECT order_id, order_date, CONCAT('$', total_cost) as total_cost, shopper_id, seller_id FROM Orders;";
    let shopper_query = "SELECT shopper_id, CONCAT(first_name, ' ', last_name) as name FROM Shoppers;";
    let seller_query = "SELECT * FROM Sellers;";

    db.pool.query(order_query, function(error, rows, fields){
        let orders = rows;

        db.pool.query(shopper_query, function(error, rows, fields){
            let shoppers = rows;

            db.pool.query(seller_query, function(error, rows, fields){
                let sellers = rows;
                return res.render('orders', {data: orders, shoppers: shoppers, sellers: sellers});
            })
        })
    })
});

app.post('/add-order-ajax', function (req, res) {

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Orders (order_date, total_cost, shopper_id, seller_id) VALUES ('${data.order_date}', '${data.total_cost}', '${data.shopper_id}', '${data.seller_id}');`;

    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on ClothingItems_Orders
            // query2 = "SELECT * FROM ClothingItems_Orders;";
            query2 = "SELECT order_id, order_date, CONCAT('$', total_cost) as total_cost, shopper_id, seller_id FROM Orders;";
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Order details routes
app.get('/order_details', function(req, res)
    {  
        let query1 = "SELECT Orders.order_id, ClothingItems.item_id, item_quantity, CONCAT('$', sold_price) as sold_price FROM Orders INNER JOIN ClothingItems_Orders ON Orders.order_id = ClothingItems_Orders.order_id INNER JOIN ClothingItems ON ClothingItems_Orders.item_id = ClothingItems.item_id";
        
        let query2 = "SELECT * FROM ClothingItems;";

        let query3 = "SELECT * FROM Orders;";

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            // Save all order details
            let order_details = rows;

            // Runs second query
            db.pool.query(query2, (error, rows, fields) => {
            
                // Save item descriptions
                let item_descriptions = rows;

                // Run third query
                db.pool.query(query3, (error, rows, fields) => {

                    // Save order descriptions
                    let order_descriptions = rows;

                    return res.render('order_details', {data: order_details, item_descriptions: item_descriptions, order_descriptions: order_descriptions});
                })
            })
        })                                                    
    });

app.post('/add-order-details-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO ClothingItems_Orders (order_id, item_id, item_quantity, sold_price) VALUES('${data.order_id}', '${data.item_id}', '${data.item_quantity}', '${data.sold_price}');`;

    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on ClothingItems_Orders
            // query2 = "SELECT * FROM ClothingItems_Orders;";
            query2 = "SELECT Orders.order_id, ClothingItems.item_id, item_quantity, CONCAT('$', sold_price) as sold_price FROM Orders INNER JOIN ClothingItems_Orders ON Orders.order_id = ClothingItems_Orders.order_id INNER JOIN ClothingItems ON ClothingItems_Orders.item_id = ClothingItems.item_id;"
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip3.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});

