set foreign_key_checks=0;

drop table if exists users;
drop table if exists category;
drop table if exists products;
drop table if exists images;

CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100),
    role INTEGER DEFAULT 0
);

CREATE TABLE category(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE products(
    id  INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200),
    description VARCHAR(1000),
    price DECIMAL(10,2),
    stock_quantity INTEGER,
    category_id INTEGER,

    CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES category(id) ON DELETE CASCADE

);

CREATE TABLE images(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(2048) NOT NULL,
    product_id INTEGER,

    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

set foreign_key_checks=0;
