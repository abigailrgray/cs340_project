// app.js
var path = require('path');

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
PORT        = 9271;                 // Set a port number at the top so it's easy to change in the future

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
        let query1 = "SELECT Orders.order_id, ClothingItems.item_id, CONCAT(color, ' ', brand, ' ', clothing_type) as item_description, CONCAT('date: ', order_date, ' total: $', total_cost) AS order_description, item_quantity, CONCAT('$', sold_price) as sold_price FROM Orders INNER JOIN ClothingItems_Orders ON Orders.order_id = ClothingItems_Orders.order_id INNER JOIN ClothingItems ON ClothingItems_Orders.item_id = ClothingItems.item_id";
        
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

                    return res.render('index', {data: order_details, item_descriptions: item_descriptions, order_descriptions: order_descriptions});
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
            query2 = "SELECT Orders.order_id, ClothingItems.item_id, CONCAT(color, ' ', brand, ' ', clothing_type) as item_description, CONCAT('date: ', order_date, ' total: $', total_cost) AS order_description, item_quantity, CONCAT('$', sold_price) as sold_price FROM Orders INNER JOIN ClothingItems_Orders ON Orders.order_id = ClothingItems_Orders.order_id INNER JOIN ClothingItems ON ClothingItems_Orders.item_id = ClothingItems.item_id;"
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