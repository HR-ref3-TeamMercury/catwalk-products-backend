CREATE DATABASE SDC;
USE SDC;

CREATE TABLE products(
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(200),
  description VARCHAR(1000),
  category VARCHAR(50),
  default_price INT
);
CREATE TABLE styles(
  id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(100),
  sale_price VARCHAR (10),
  original_price INT NOT NULL,
  default_style INT
);

CREATE TABLE features(
  id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  feature VARCHAR(100),
  value VARCHAR(100)
);

CREATE TABLE photos(
  id INT,
  style_id INT,
  url VARCHAR(2000),
  thumbnail_url VARCHAR(2000)
);

CREATE TABLE skus(
  id INT PRIMARY KEY NOT NULL,
  style_id INT NOT NULL,
  size VARCHAR(12),
  quantity INT
);

CREATE TABLE related(
  id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  related_product_id INT
);

LOAD DATA LOCAL INFILE './database/data/product.csv' INTO TABLE products FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './database/data/styles.csv' INTO TABLE styles FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './database/data/features.csv' INTO TABLE features FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './database/data/photos.csv' INTO TABLE photos FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './database/data/skus.csv' INTO TABLE skus FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE './database/data/related.csv' INTO TABLE related FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;