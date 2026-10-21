# Library Management System

A simple REST API built using Node.js and Express.js for managing a library.

## Features
- Add and view books
- Register and view members
- Borrow books
- Return borrowed books
- View borrowing records
- Track available book copies

## Technologies
- Node.js
- Express.js
- JavaScript
- Postman

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/library/books` | Add a book |
| GET | `/api/library/books` | Get all books |
| POST | `/api/library/members` | Register a member |
| GET | `/api/library/members` | Get all members |
| POST | `/api/library/borrow/:bookId` | Borrow a book |
| PUT | `/api/library/return/:borrowId` | Return a book |
| GET | `/api/library/borrowed` | View borrowing records |

## Installation

```bash
npm install
npm start
```

## Data Storage
Data is stored in JavaScript arrays and resets when the server restarts.

## Author
Dominic Rozario