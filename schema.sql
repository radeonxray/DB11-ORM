DROP DATABASE IF EXISTS MicroShop;
CREATE DATABASE MicroShop;
USE MicroShop;
CREATE TABLE `Customer` (
   id int AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255)
);
CREATE TABLE `Order` (
   id int AUTO_INCREMENT PRIMARY KEY,
   date VARCHAR(255),
   total DECIMAL
);
CREATE TABLE `OrderLine` (
   id int AUTO_INCREMENT PRIMARY KEY,
   count DECIMAL,
   total DECIMAL
);
CREATE TABLE `Product` (
   id int AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255),
   price DECIMAL
);
CREATE TABLE `ViktoKim` (
   id int AUTO_INCREMENT PRIMARY KEY
);
CREATE TABLE `Cars` (
   id int AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255),
   price DECIMAL
);
CREATE TABLE `Customer_Order` (
   id int AUTO_INCREMENT PRIMARY KEY
);
CREATE TABLE `Order_OrderLine` (
   id int AUTO_INCREMENT PRIMARY KEY
);
CREATE TABLE `ViktoKim_Cars` (
   id int AUTO_INCREMENT PRIMARY KEY
);
ALTER TABLE `MicroShop`.`Order`
ADD COLUMN `viktokim` int,
ADD FOREIGN KEY (`viktokim`) REFERENCES `ViktoKim`(`id`);
ALTER TABLE `MicroShop`.`Product`
ADD COLUMN `orderline` int,
ADD FOREIGN KEY (`orderline`) REFERENCES `OrderLine`(`id`),
ADD COLUMN `viktokim` int,
ADD FOREIGN KEY (`viktokim`) REFERENCES `ViktoKim`(`id`);
ALTER TABLE `MicroShop`.`Customer_Order`
ADD COLUMN `customer_id` int,
ADD FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`),
ADD COLUMN `order_id` int,
ADD FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`);
ALTER TABLE `MicroShop`.`Order_OrderLine`
ADD COLUMN `order_id` int,
ADD FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`),
ADD COLUMN `orderline_id` int,
ADD FOREIGN KEY (`orderline_id`) REFERENCES `OrderLine`(`id`);
ALTER TABLE `MicroShop`.`ViktoKim_Cars`
ADD COLUMN `viktokim_id` int,
ADD FOREIGN KEY (`viktokim_id`) REFERENCES `ViktoKim`(`id`),
ADD COLUMN `cars_id` int,
ADD FOREIGN KEY (`cars_id`) REFERENCES `Cars`(`id`);
