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

app.get('/', function(req, res)
    {
        res.render('index')
    });

app.get('/sellers', function(req, res)
{
    // shopper_id, username, password, first_name, last_name, email, phone_number
    let query1 = "SELECT * FROM Sellers;";

    db.pool.query(query1, function(error, rows, fields){
        
        let sellers = rows;
        return res.render('sellers', {data: sellers});
    })
});


app.get('/clothing_items', function(req, res)
    {
        res.render('clothing_items');
    }
)

app.get('/orders', function(req, res)
{
    // shopper_id, username, password, first_name, last_name, email, phone_number
    let query1 = "SELECT * FROM Orders;";
    let query2 = "SELECT seller_id FROM Sellers";
    let query3 = "SELECT shopper_id FROM Shoppers";
    db.pool.query(query1, function(error, rows, fields){ 
        let orders = rows;
    
        // Runs second query
        db.pool.query(query2, function(error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(400);
                return;
            }
            
            // Save seller IDs
            let seller_id = rows.map(row => row.seller_id);

            // Runs third query
            db.pool.query(query3, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                    return;
                }

                // Save shopper IDs
                let shopper_id = rows.map(row => row.shopper_id);

                res.render('orders', { data: orders, seller_id: seller_id, shopper_id: shopper_id });
            })
        })
    })                                                    
});

app.get('/order_details', function(req, res)
    {  
        let query1 = "SELECT Orders.order_id, ClothingItems.item_id, item_quantity, CONCAT('$', sold_price) as sold_price FROM Orders INNER JOIN ClothingItems_Orders ON Orders.order_id = ClothingItems_Orders.order_id INNER JOIN ClothingItems ON ClothingItems_Orders.item_id = ClothingItems.item_id";
        
        let query2 = "SELECT item_id, CONCAT(color, ' ', brand, ' ', clothing_type) as item_description FROM ClothingItems;";

        let query3 = "SELECT order_id, CONCAT('date: ', order_date, ' total: $', total_cost) AS order_description FROM Orders;";

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

app.get('/shoppers', function(req, res)
    {
        // shopper_id, username, password, first_name, last_name, email, phone_number
        let query1 = "SELECT * FROM Shoppers;";

        db.pool.query(query1, function(error, rows, fields){
            
            let shoppers = rows;
            return res.render('shoppers', {data: shoppers});
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

app.delete('/delete-shopper-ajax/', function(req,res,next){
    console.log('app.js delete was reached')
    let data = req.body;
    let shopperID = parseInt(data.shopper_id);
    let query1 = `DELETE FROM Shoppers WHERE shopper_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(query1, [shopperID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              console.log('there was an error')
              res.sendStatus(400);
              }
              
              else
              {
                res.sendStatus(204);
              }
  })});

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

app.delete('/delete-sellers-ajax/', function(req,res,next){
    console.log('app.js delete was reached')
    let data = req.body;
    let seller_id = parseInt(data.shopper_id);
    let query1 = `DELETE FROM Sellers WHERE seller_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(query1, [seller_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              console.log('there was an error')
              res.sendStatus(400);
              }
              
              else
              {
                res.sendStatus(204);
              }
  })});

app.post('/add-orders-ajax', function (req, res) {

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Orders (order_id, order_date, total_cost, shopper_id, seller_id) VALUES('${data.order_id}', '${data.order_date}', '${data.total_cost}', '${data.shopper_id}', '${data.seller_id}');`;

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
            query2 = "SELECT * FROM Orders;"
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
    console.log('Express started on http://flip1.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});
