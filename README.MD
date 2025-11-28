# Bertie's Books 📚

A simple bookshop web application built with Node.js, Express, and MySQL.

## What it does

This is a web app for managing a bookshop. You can view, add, and manage books with their names and prices.

## Tech Stack

- **Node.js** with Express
- **EJS** for templates
- **MySQL** for the database
- **CSS** for styling

## Dotenv

Dotenv was implemented by creating a .env file with database credentials and using the dotenv package with require('dotenv').config() to load those values into process.env to use for the MySQL connection.

## Audit

Audit was implemented by creating a new table with 'username' 'password' 'successful' as columns, if an attempt was successful the successful column would be equal to one, then every login attempt a new record is inserted into the table and then can be displayed.

## Access control

Added access control to audit and add book so only logged in users can do that.

## Where validation was added

Added validation to search result to check for empty fields, added a length limit to name and to check if not empty and price to be above 0, and also to added to check if username or password is not empty for login page, these were the only necessary forms that needed validation.

## Getting Started

### 1. Install Dependencies

```bash
npm install express ejs mysql2
```

### 2. Set Up the Database

Run these SQL scripts in order:

```bash
mysql -u root -p < create_db.sql
mysql -u root -p < insert_test_data.sql
```

This creates:
- A database called `berties_books`
- A `books` table with id, name, and price
- A user `berties_books_app` with password `qwertyuiop`
- Some sample books to get started

### 3. Run the App

```bash
node index.js
```
Visit `http://localhost:8000` in your browser.

```

## Sample Books

The app comes with these books pre-loaded:
- Brighton Rock (£20.25)
- Brave New World (£25.00)
- Animal Farm (£12.99)
- Phils Poetry (£67.69)
- Toms Trails (£19.99)

---