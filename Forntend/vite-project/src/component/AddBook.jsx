import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [book, setBook] = useState({ title: "", author: "", genre: "", year: "", description: "", coverImage: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post("https://libarymanagement-dzib.onrender.com/api/books/add", book)
      .then(() => navigate("/dashboard"))
      .catch(error => console.error("Error adding book:", error));
  };

  return (
    <div className="container">
      <h2>Add New Book</h2>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} />
      <input type="text" name="author" placeholder="Author" onChange={handleChange} />
      <input type="text" name="genre" placeholder="Genre" onChange={handleChange} />
      <input type="number" name="year" placeholder="Year" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <input type="text" name="coverImage" placeholder="Cover Image URL" onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddBook;
