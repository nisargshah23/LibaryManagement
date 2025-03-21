const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true },
  bookUrl:{ type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Book", BookSchema);
