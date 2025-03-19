const express = require("express");
const Book = require("../models/Book");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



router.post("/add", async (req, res) => {
  const { title, author, genre, year, description, coverImage } = req.body;

  try {
    const newBook = new Book({ title, author, genre, year, description, coverImage });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
