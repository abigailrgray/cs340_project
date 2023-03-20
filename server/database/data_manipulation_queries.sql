-- Data manipulation queries

-- QUERIES FOR SHOPPERS PAGE FUNCTIONALITY --
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


-- QUERIES FOR SELLERS PAGE FUNCTIONALITY --
-- Get all sellers for the Sellers page
SELECT * FROM Sellers;

-- Add a new seller
INSERT INTO Sellers (username, password, shop_name, email, phone_number)
VALUES (:username_input, :password_input, :shop_name_input, :email_input, :phone_number_input);


-- QUERIES FOR CLOTHING ITEMS PAGE FUNCTIONALITY --
-- Get all clothing items for Clothing Items page
SELECT item_id, clothing_type, color, size, brand, item_condition, CONCAT('$' + current_price) as current_price, quantity, IF(is_available = 1, 'Yes', 'No') as is_available, seller_id FROM ClothingItems;

-- Get all sellers to populate the Seller dropdown
SELECT seller_id, username FROM Sellers;

-- Add a new clothing item
INSERT INTO ClothingItems(clothing_type, color, size, brand item_condition, current_price, quantity, is_available, seller_id
) VALUES (:clothing_type_input, :color_input, :size_input, :brand_input, item_condition_input, :current_price_input, :quantity_input, :is_available_input, :seller_id_input_from_dropdown);


-- Get all orders to populate the dropdown for associating with a clothing item
SELECT order_id, order_date, total_cost FROM Orders;

SELECT order_id, CONCAT('date: ', order_date, ' total: $', total_cost) AS order_description FROM Orders;


-- Get all orders with their associated items
SELECT Orders.order_id, ClothingItems.item_id, CONCAT(color, ' ', brand, ' ', clothing_type) as item_description, CONCAT('date: ', order_date, ' total: $', total_cost) AS order_description, item_quantity, CONCAT('$', sold_price) as sold_price
FROM Orders
INNER JOIN ClothingItems_Orders ON Orders.order_id = ClothingItems_Orders.order_id
INNER JOIN ClothingItems ON ClothingItems_Orders.item_id = ClothingItems.item_id
ORDER BY item_description, order_description;


-- Add a new order
INSERT INTO Orders(
    order_date,
    total_cost,
    shopper_id,
    seller_id
)
VALUES
(
    :order_date_input,
    :total_cost_input,
    :shopper_id_input_from_dropdown,
    :seller_id_input_from_dropdown
);

-- Associate an order with a clothing item (M:M relationship addition)
INSERT INTO ClothingItems_Orders (
    order_id,
    item_id,
    item_quantity,
    sold_price
)
VALUES
(
    `${data.order_id}`,
    `${data.item_id}`,
    `${data.item_quantity}`,
    `${data.sold_price}`
);

-- Disassociate an order from a clothing item (M:M relationship deletion)
DELETE FROM ClothingItems_Orders WHERE item_id = :item_id__from_clothing_item_and_order_list AND order_id = :order_id_from_clothing_item_and_order_list;


-- Get all shoppers to populate the Shopper dropdown
SELECT shopper_id, username FROM Shoppers;