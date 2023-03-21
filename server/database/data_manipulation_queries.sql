-- Data manipulation queries

-- QUERIES FOR SHOPPERS TABLE --
-- Get all shoppers for the Shoppers page
SELECT * FROM Shoppers;

-- Add a new shopper
INSERT INTO Shoppers (username, password, first_name, last_name, email, phone_number) VALUES (:username_input, :password_input, :firstname_input, :lastname_input, :email_input, :phonenumber_input);

-- Update a shopper's data based on submission of the Update Shopper form
UPDATE Shoppers SET username = :username_input, password = :password_input, first_name = :firstname_input, last_name = :lastname_input, email = :email_input, phone_number = :phonenumber_input WHERE shopper_id = :shopperid_from_update_form;

-- Get a single shopper after submission of the Update Shopper form
SELECT * FROM Shoppers WHERE shopper_id = :shopper_id_from_update_form;

-- Delete a shopper
DELETE FROM Shoppers where shopper_id = :shopper_id_from_browse_shoppers_page;

-- Get all shoppers and their names to populate the Shoppers dropdown
SELECT shopper_id, CONCAT(first_name, ' ', last_name) as name FROM Shoppers;


-- QUERIES FOR SELLERS TABLE --
-- Get all sellers for the Sellers page
SELECT * FROM Sellers;

-- Add a new seller
INSERT INTO Sellers (username, password, shop_name, email, phone_number)
VALUES (:username_input, :password_input, :shop_name_input, :email_input, :phone_number_input);

-- Get all sellers to populate the Sellers dropdowns
SELECT * FROM Sellers;


-- QUERIES FOR CLOTHING ITEMS TABLE --
-- Get all clothing items for the Clothing Items page
SELECT item_id, clothing_type, color, size, brand, item_condition, CONCAT('$' + current_price) as current_price, quantity, IF(is_available = 1, 'Yes', 'No') as is_available, seller_id FROM ClothingItems;

-- Add a new clothing item
INSERT INTO ClothingItems(clothing_type, color, size, brand item_condition, current_price, quantity, is_available, seller_id)
VALUES (:clothing_type_input, :color_input, :size_input, :brand_input, item_condition_input, :current_price_input, :quantity_input, :is_available_input, :seller_id_input_from_dropdown);

-- Get all clothing items to add the clothing from the Add Clothing Items form to the data table
SELECT item_id, clothing_type, color, size, brand, item_condition, CONCAT('$' + current_price) as current_price, quantity, IF(is_available = 1, 'Yes', 'No') as is_available, seller_id FROM ClothingItems;

-- Get all clothing items for the Clothing Items dropdown
SELECT * FROM ClothingItems;


-- QUERIES FOR ORDERS TABLE --
-- Get all orders for the Orders page
SELECT order_id, DATE_FORMAT(order_date, '%m/%d/%Y') as order_date, CONCAT('$', total_cost) as total_cost, shopper_id, seller_id FROM Orders;

-- Add a new order
INSERT INTO Orders(order_date, total_cost, shopper_id, seller_id)
VALUES (:order_date_input, :total_cost_input, :shopper_id_input_from_dropdown,:seller_id_input_from_dropdown);

-- Get all orders for Orders dropdown
SELECT * FROM Orders;


-- QUERIES FOR ORDER DETAILS TABLE --
-- Get all orders and their associated items for the Order Details page and Order Details dropdown
SELECT order_details_id, order_id, item_id, item_quantity, CONCAT('$', sold_price) as sold_price, CONCAT('Order ', order_id, ' Item ', item_id) as order_details FROM ClothingItems_Orders;

-- Associate an order with a clothing item (M:M relationship addition)
INSERT INTO ClothingItems_Orders (order_id, item_id, item_quantity, sold_price)
VALUES (:orderid_from_dropdown, :itemid_from_dropdown, :itemquantity_input, :soldprice_input);

-- Update an association between an order and a clothing item (M:M relationship update)
UPDATE ClothingItems_Orders SET item_quantity = :item_quantity, sold_price = :soldprice_input WHERE order_details_id = :orderdetailsid_from_dropdown;

-- Disassociate an order from a clothing item (M:M relationship deletion)
DELETE FROM ClothingItems_Orders WHERE order_details_id = order_details_id_from_dropdown;