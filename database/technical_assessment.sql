CREATE DATABASE IF NOT EXISTS technical_assessment;

use technical_assessment;

CREATE TABLE IF NOT EXISTS invoices(  
    id INT primary key AUTO_INCREMENT,          
    id_client INT,
    date varchar(100),
    subtotal INT,
    discount INT,
    total INT
); 

CREATE TABLE IF NOT EXISTS clients(  
    id INT primary key AUTO_INCREMENT,          
    client VARCHAR(100) NOT NULL
); 

CREATE TABLE IF NOT EXISTS products(  
    id INT primary key AUTO_INCREMENT,          
    description_product VARCHAR(100),
    price INT NOT NULL
); 

CREATE TABLE IF NOT EXISTS invoices_products(  
    id_invoice INT AUTO_INCREMENT,          
    id_product INT,
    quantity INT,
    PRIMARY KEY (id_invoice,id_product)
);

ALTER TABLE invoices
ADD CONSTRAINT invoice_client
FOREIGN KEY (id_client) REFERENCES clients (id);
ALTER TABLE invoices_products
ADD CONSTRAINT invoice_products
FOREIGN KEY (id_product) REFERENCES products(id);
ALTER TABLE invoices_products
ADD CONSTRAINT prod_invoice
FOREIGN KEY (id_invoice) REFERENCES invoices(id);



insert into clients (client)
values('Ulter Technologies');
insert into clients  (client)
values('Luxon Engineering');
insert into clients (client)
values('Cyvic Inc.');
insert into clients (client)
values('Techspring Partners LLC');



insert into products (description_product,price)
values('iPhone 11',2500000);
insert into products (description_product,price)
values('iPad SE',3500000);
insert into products (description_product,price)
values('Macbook Air 13"',30500000);
insert into products (description_product,price)
values('Airpods',500000);

