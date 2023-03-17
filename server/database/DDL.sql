SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE TABLE Shoppers(
    shopper_id int(11) AUTO_INCREMENT NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    phone_number varchar(255) NOT NULL,
    PRIMARY KEY (shopper_id)
);

CREATE OR REPLACE TABLE Sellers(
    seller_id int(11) AUTO_INCREMENT NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    shop_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    phone_number varchar(255) NOT NULL,
    PRIMARY KEY (seller_id)
);

CREATE OR REPLACE TABLE ClothingItems(
    item_id int(11) AUTO_INCREMENT NOT NULL,
    clothing_type varchar(255) NOT NULL,
    color varchar(255) NOT NULL,
    size varchar(255) NOT NULL,
    brand varchar(255) NOT NULL,
    item_condition varchar(255) NOT NULL,
    current_price int NOT NULL,
    quantity int NOT NULL,
    is_available boolean NOT NULL,
    seller_id int(11) NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (seller_id) REFERENCES Sellers(seller_id)
);

CREATE OR REPLACE TABLE Orders(
    order_id int AUTO_INCREMENT NOT NULL,
    order_date date NOT NULL,
    total_cost int NOT NULL,
    shopper_id int NOT NULL,
    seller_id int NOT NULL,
    PRIMARY KEY (order_id),
    FOREIGN KEY (seller_id) REFERENCES Sellers(seller_id) ON DELETE CASCADE,
    FOREIGN KEY (shopper_id) REFERENCES Shoppers(shopper_id) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE ClothingItems_Orders(
    order_details_id int(11) AUTO_INCREMENT NOT NULL,
    item_id int NOT NULL,
    order_id int NOT NULL,
    item_quantity int NOT NULL,
    sold_price int NOT NULL,
    PRIMARY KEY (order_details_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES ClothingItems(item_id) ON DELETE CASCADE,
    UNIQUE KEY (item_id, order_id)
);

INSERT INTO Shoppers(
    shopper_id,
    username,
    password,
    first_name,
    last_name,
    email,
    phone_number
)
VALUES
(
    1,
    'deanscott37',
    'jed8Kiexei',
    'Dean',
    'Scott',
    'dscott@gmail.com',
    '479-737-5935'
),
(
    2,
    'barbara981',
    'aiSais7ph',
    'Barbara',
    'Coleman',
    'barbara_coleman@hotmail.com',
    '908-434-1553'
),
(
    3,
    'santos763',
    'Ephoh9ie',
    'Mariana',
    'Santos',
    'msantos@yahoo.com',
    '512-812-3848'

);

INSERT INTO Sellers(
    seller_id,
    username,
    password,
    shop_name,
    email,
    phone_number
)
VALUES
(
    1,
    'sarahsshop',
    'arae3ieTeg',
    "Sarah’s Shop",
    'slevine@gmail.com',
    '913-620-9667'
),
(
    2,
    'colescloset',
    'aithiah6I',
    'Cole’s Closet',
    'cole835@aol.com',
    '217-914-7468'
),
(
    3,
    'vintage_boutique',
    'uuz6ahTaz',
    'The Vintage Boutique',
    'vintagebotique@hotmail.com',
    '971-409-1011'
);

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
VALUES
(
    '1',
    'shirt',
    'red',
    'small',
    'Adidas',
    'new',
    8.99,
    2,
    1,
    (SELECT seller_id FROM Orders WHERE seller_id=3)
),
(
    2,
    'pants',
    'blue',
    30,
    'Levi’s',
    'good',
    12.99,
    0,
    0,
    1
),
(
    3,
    'jacket',
    'green',
    'large',
    'Gap',
    'fair',
    15.00,
    1,
    1,
    2
);

INSERT INTO Orders(
    order_id,
    order_date,
    total_cost,
    shopper_id,
    seller_id
)
VALUES
(
    1,
    '2022-09-24',
    48.95,
    3,
    2
),
(
    2,
    '2022-10-03',
    72.34,
    3,
    2

),
(
    3,
    '2023-01-10',
    34.61,
    2,
    3

);

INSERT INTO ClothingItems_Orders(
    item_id,
    order_id,
    item_quantity,
    sold_price

)
VALUES
(
    1,
    3,
    2,
    8.99

),
(
    1,
    2,
    1,
    8.99

),
(
    3,
    3,
    1,
    13.00
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;