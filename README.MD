# Bertie's Books 📚

A simple bookshop web application built with Node.js, Express, and MySQL.

## What it does

This is a web app for managing a bookshop. You can view, add, and manage books with their names and prices.

## Tech Stack

- **Node.js** with Express
- **EJS** for templates
- **MySQL** for the database
- **CSS** for styling

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