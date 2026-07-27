const express = require("express");
const axios = require("axios");
const books = require("./booksdb.js");
const { isValid, users } = require("./auth_users.js");

const publicUsers = express.Router();

/*
 * Axios normally retrieves data over HTTP. For this assignment, the source is
 * the supplied in-memory books database, so a custom Axios adapter exposes the
 * same asynchronous Promise interface without making the API call itself.
 */
const bookDataClient = axios.create({
  adapter: async (config) => ({
    data: books,
    status: 200,
    statusText: "OK",
    headers: {},
    config,
    request: null
  })
});

const getAllBooks = async () => {
  const response = await bookDataClient.get("/books");
  return response.data;
};

const getBookByISBN = (isbn) =>
  bookDataClient.get("/books").then((response) => response.data[isbn]);

const getBooksByAuthor = async (author) => {
  const response = await bookDataClient.get("/books");
  const normalizedAuthor = author.toLowerCase();

  return Object.fromEntries(
    Object.entries(response.data).filter(([, book]) =>
      book.author.toLowerCase().includes(normalizedAuthor)
    )
  );
};

const getBooksByTitle = (title) =>
  bookDataClient.get("/books").then((response) => {
    const normalizedTitle = title.toLowerCase();

    return Object.fromEntries(
      Object.entries(response.data).filter(([, book]) =>
        book.title.toLowerCase().includes(normalizedTitle)
      )
    );
  });

publicUsers.post("/register", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required."
    });
  }

  if (isValid(username)) {
    return res.status(409).json({
      message: "Username already exists."
    });
  }

  users.push({ username, password });

  return res.status(201).json({
    message: "User successfully registered. Now you can login."
  });
});

publicUsers.get("/", async (_req, res) => {
  try {
    return res.status(200).json(await getAllBooks());
  } catch (_error) {
    return res.status(500).json({ message: "Unable to retrieve books." });
  }
});

publicUsers.get("/isbn/:isbn", async (req, res) => {
  try {
    const book = await getBookByISBN(req.params.isbn);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    return res.status(200).json(book);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to retrieve the book." });
  }
});

publicUsers.get("/author/:author", async (req, res) => {
  try {
    const matches = await getBooksByAuthor(req.params.author);

    if (Object.keys(matches).length === 0) {
      return res.status(404).json({ message: "No books found for that author." });
    }

    return res.status(200).json(matches);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to retrieve books." });
  }
});

publicUsers.get("/title/:title", async (req, res) => {
  try {
    const matches = await getBooksByTitle(req.params.title);

    if (Object.keys(matches).length === 0) {
      return res.status(404).json({ message: "No books found with that title." });
    }

    return res.status(200).json(matches);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to retrieve books." });
  }
});

publicUsers.get("/review/:isbn", async (req, res) => {
  try {
    const book = await getBookByISBN(req.params.isbn);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    return res.status(200).json(book.reviews);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to retrieve reviews." });
  }
});

module.exports.general = publicUsers;
module.exports.getAllBooks = getAllBooks;
module.exports.getBookByISBN = getBookByISBN;
module.exports.getBooksByAuthor = getBooksByAuthor;
module.exports.getBooksByTitle = getBooksByTitle;
