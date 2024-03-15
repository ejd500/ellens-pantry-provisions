create table "products" (
	product_id VARCHAR(50),
	product_name VARCHAR(50),
	quantity_on_hand INT,
	wholesale_price DECIMAL(4,2),
	retail_price DECIMAL(4,2),
	profit DECIMAL(4,2) GENERATED ALWAYS AS (retail_price - wholesale_price) STORED
);