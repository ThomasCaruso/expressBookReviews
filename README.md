# Express Book Reviews

A completed Node.js and Express REST API for IBM's **Developing Back-End Apps with Node.js and Express** book-review project.

## Features

- Retrieve all books.
- Search by ISBN, author, or title.
- Retrieve book reviews.
- Register and log in users.
- Protect review mutations with session-backed JWT authentication.
- Add, update, and delete only the logged-in user's review.
- Use asynchronous Promise and `async`/`await` flows with Axios for all four book-retrieval methods.

## Run locally

```bash
cd final_project
npm install
npm start
```

The API runs at `http://localhost:5000`.

## Endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/` | Public | Retrieve all books |
| `GET` | `/isbn/:isbn` | Public | Retrieve a book by ISBN |
| `GET` | `/author/:author` | Public | Retrieve books by author |
| `GET` | `/title/:title` | Public | Retrieve books by title |
| `GET` | `/review/:isbn` | Public | Retrieve reviews for a book |
| `POST` | `/register` | Public | Register a user |
| `POST` | `/customer/login` | Public | Log in and establish an authenticated session |
| `PUT` | `/customer/auth/review/:isbn` | Authenticated | Add or update the user's review |
| `DELETE` | `/customer/auth/review/:isbn` | Authenticated | Delete the user's review |

## Evidence

The `submission_evidence/` directory contains each required cURL command and its validated output:

- `githubrepo.txt`
- `getallbooks.txt`
- `getbooksbyISBN.txt`
- `getbooksbyauthor.txt`
- `getbooksbytitle.txt`
- `getbookreview.txt`
- `register.txt`
- `login.txt`
- `reviewadded.txt`
- `deletereview.txt`

## Required GitHub code URLs

- `general.js`: `https://github.com/ThomasCaruso/expressBookReviews/blob/main/final_project/router/general.js`
- `auth_users.js`: `https://github.com/ThomasCaruso/expressBookReviews/blob/main/final_project/router/auth_users.js`
- `index.js`: `https://github.com/ThomasCaruso/expressBookReviews/blob/main/final_project/index.js`
- Repository: `https://github.com/ThomasCaruso/expressBookReviews`

## Fork lineage

This repository is a public fork of `ibm-developer-skills-network/expressBookReviews`. The verification command and expected GitHub API output are saved in `submission_evidence/githubrepo.txt`.
