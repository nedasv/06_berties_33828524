# Insert data into the tables

USE berties_books;

INSERT INTO books (name, price)VALUES('Brighton Rock', 20.25),('Brave New World', 25.00), ('Animal Farm', 12.99), ('Phils Poetry', 67.69), ('Toms Trails', 19.99) ;
INSERT INTO users (username, first_name, last_name, email, password_hash) VALUES ("gold", "gold", "smiths", "goldsmiths@gold.ac.uk", "$2b$10$nQEJ1AQyCqEJiHvJhEbcfOoLz0k904CJl5M3QEV82/VPyR1j2ANJ6")