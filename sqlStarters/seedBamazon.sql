DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(200) NOT NULL,
  price int NOT NULL,
  stock_quanity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("Phone Chargers", "Electronics",5,100);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("Apple Phone Chargers", "Electronics",50,40);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("Tablets", "Electronics",100,25);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("T-Shirts", "Clothing",5,200);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("Jeans", "Clothing",20,50);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("DOOM", "Games",45,50);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("Sim Tower", "Games",20,100);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("Destiny 2", "Games",50,50);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("Borderlands 3", "Games",65,50);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("Hair Spray", "Sundries",10,250);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("Hair Gel", "Sundries",8,300);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("Beard Shampoo", "Sundries",15,100);

INSERT INTO products (product_name, department_name,price,stock_quanity)
VALUES ("Beard Conditioner", "Sundries",12,300);