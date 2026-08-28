 # Online Library Management System — Backend

Backend for a library management system built with Node.js, Express, and MongoDB.

## Folder Structure

backend/
├── config/
│   └── db.js               ← MongoDB connection
├── models/
│   ├── User.js               ← Admin / Librarian / Member accounts
│   ├── Book.js                ← Book catalog
│   └── Transaction.js         ← Issue & return records
├── controllers/
│   ├── authController.js      ← Register, login, get profile
│   ├── bookController.js      ← Add, update, delete, view books
│   ├── issueController.js     ← Issue and return books, calculates fines
│   └── memberController.js    ← Member management
├── middleware/
│   ├── authMiddleware.js      ← Protects routes, checks login token
│   └── errorMiddleware.js
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   ├── issueRoutes.js
│   └── memberRoutes.js
├── utils/
│   ├── generateToken.js       ← Creates login tokens (JWT)
│   └── calculateFine.js       ← Calculates late-return fines
├── server.js
├── .env.example
└── package.json

## Database Design

**User**

| Field    | Type   | Notes                                        |
|----------|--------|-----------------------------------------------|
| name     | String | required                                      |
| email    | String | required, unique                              |
| password | String | required, hashed automatically before saving  |
| phone    | String | optional                                      |
| role     | String | 'admin' \| 'librarian' \| 'member'            |

**Book**

| Field         | Type   | Notes                          |
|---------------|--------|----------------------------------|
| title         | String | required                        |
| author        | String | required                        |
| isbn          | String | required, unique                |
| category      | String | defaults to 'General'           |
| quantity      | Number | total copies owned              |
| available     | Number | copies currently on the shelf   |
| publishedYear | Number | optional                        |
| description   | String | optional                        |

**Transaction** (one per book issue/return)

| Field      | Type     | Notes                                      |
|------------|----------|---------------------------------------------|
| book       | ObjectId | reference to Book                            |
| member     | ObjectId | reference to User                            |
| dueDate    | Date     | set when the book is issued                  |
| returnDate | Date     | null until the book is returned              |
| fine       | Number   | calculated when the book is returned late    |
| status     | String   | 'issued' \| 'returned'                       |

## Fine Logic

`utils/calculateFine.js` charges 10 units per day the book is returned late. It's used inside `issueController.js`'s `returnBook` function. If the book is returned on time or early, the fine is 0.

## Local Setup

1. Clone the repo and go into the backend folder:

   cd backend

2. Install the packages:

   npm install

3. Copy `.env.example` to `.env`:

   cp .env.example .env

4. Open `.env` and fill in your real values:

   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5000
   JWT_SECRET=any_random_long_text

5. Start the server:

   node server.js

   You should see `MongoDB Connected` and `Server running on port 5000`.

## API Endpoints (summary)

- `POST /api/auth/register` — create a new account
- `POST /api/auth/login` — log in, returns a token
- `GET /api/books` — view all books
- `POST /api/books` — add a book (admin)
- `POST /api/issue` — issue a book to a member
- `PUT /api/issue/:id/return` — return a book, calculates fine if late

## Deployment

Planned: Render (backend hosting) + MongoDB Atlas (already set up, IP access allowed from anywhere). Deployment steps will be added once all team features are merged into `main`.
