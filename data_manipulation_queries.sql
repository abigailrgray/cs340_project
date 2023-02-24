-- Data manipulation queries

-- Get all sellers to populate the Seller dropdown
SELECT seller_id, username FROM Sellers;

-- Get all shoppers to populate the Shopper dropdown
SELECT shopper_id, username FROM Shoppers;

-- Get all clothing items to populate the dropdown for associating with an order
SELECT item_id, clothing_type, color, size, brand FROM ClothingItems;

-- Get all orders to populate the dropdown for associating with a clothing item
SELECT order_id, order_date, total_cost FROM Orders;

-- Get all orders with their associated items
SELECT order_id, item_id, CONCAT(color, ' ', brand, ' ', clothing_type) as item, CONCAT('date: ', order_date, ' total: $', total_cost) as order FROM
FROM Orders
INNER JOIN ClothingItems_Orders ON Orders.order_id = ClothingItems_Orders.order_id
INNER JOIN ClothingItems ON ClothingItems.item_id = ClothingItems_Orders.item_id
ORDER BY order_id, item

-- Add a new shopper
INSERT INTO Shoppers (
    username,
    password,
    first_name,
    last_name,
    email,
    phone_number)
VALUES (
    :username_input,
    :password_input,
    :first_name_input,
    :last_name_input,
    :email_input,
    :phone_number_input);

-- Add a new seller
INSERT INTO Sellers (
    username,
    password,
    shop_name,
    email,
    phone_number
)
VALUES (
    :username_input,
    :password_input,
    :shop_name_input,
    :email_input,
    :phone_number_input);

-- Add a new clothing item
INSERT INTO ClothingItems(
    item_id,
    clothing_type,
    color,
    size,
    brand,
    item_condition,
    current_price,
    quantity,
    is_available,
    seller_id
)
VALUES (
    :item_id_input,
    :clothing_type_input,
    :color_input,
    :size_input,
    :brand_input,
    :item_condition_input,
    :current_price_input,
    :quantity_input,
    :is_available_input,
    :seller_id_input_from_dropdown
);


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
    item_id,
    order_id
)
VALUES
(
    :item_id_input_from_dropdown,
    :order_id_input_from_dropdown
);

-- Update a shopper's data based on the Update Shopper form
UPDATE Shoppers SET username = :username_input, password = :password_input, first_name = :first_name_input, last_name = :last_name_input, email = :email_input,
phone_number = :phone_number_input WHERE shopper_id = :shopper_id_from_update_form;

-- Delete a shopper
DELETE FROM Shoppers where shopper_id = :shopper_id_from_browse_shoppers_page;

-- Disassociate an order from a clothing item (M:M relationship deletion)
DELETE FROM ClothingItems_Orders WHERE item_id = :item_id__from_clothing_item_and_order_list AND order_id = :order_id_from_clothing_item_and_order_list;