# Product & Category Management System

A Node.js + Express + EJS application built as part of a technical assignment,
demonstrating CRUD operations, relational database usage (RDBMS),
and server-side pagination.

---

## Tech Stack

- Node.js (v18 LTS)

- Express.js

- EJS

- MySQL (RDBMS)

- mysql2

---

## Project Structure

```
product-category-app/
├── src/
│   ├── app.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── category.controller.js
│   │   └── product.controller.js
│   │
│   ├── routes/
│   │   ├── category.routes.js
│   │   └── product.routes.js
│   │
│   ├── views/
│   │   ├── categories/
│   │   │   └── index.ejs
│   │   │
│   │   ├── products/
│   │   │   └── index.ejs
│   │   │
│   │   └── partials/
│   │       ├── header.ejs
│   │       └── footer.ejs
│   │
│   └── public/
│       └── css/
│           └── style.css
│
├── sql/
│   └── database.sql
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Database Design

### Categories

- CategoryId (PK)

- CategoryName

### Products

- ProductId (PK)

- ProductName

- CategoryId (FK → Categories)

Relationship:

One Category → Many Products

---

## Features

### Category Master (Full CRUD)

- Add, List, Edit, Delete categories

### Product Master (Full CRUD)

- Add, List, Edit, Delete products

- Product mapped to Category

### Product Listing

- Displays ProductId, ProductName, CategoryId, CategoryName

- Uses SQL JOIN

---

## Server-side Pagination

Pagination is implemented at database level using `LIMIT` and `OFFSET`.

Formula:

OFFSET = (pageNumber - 1) \* pageSize

Example:

- Page size: 10

- Page: 9

- OFFSET: 80

- Records fetched: 81–90

---

## How to Run

1. Clone the repository

```bash

git  clone  https://github.com/Siddhesh-h/Product-Category-App.git

cd  product-category-app

```

2. Install dependencies

```bash

npm  install

```

3. Setup database

- Open MySQL Workbench

- Run sql/database.sql

4. Configure DB credentials

Create a `.env` file in the project root with the following values:

```bash
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=product_app
```

Update src/config/db.js

5. Start server

```bash

node  server.js

```

6. Open in browser

```bash
http://localhost:3000/categories

http://localhost:3000/products
```
