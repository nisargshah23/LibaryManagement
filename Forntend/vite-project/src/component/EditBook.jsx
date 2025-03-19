import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../style/editBook.css"

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    description: "",
  });

  useEffect(() => {
    fetchBookDetails();
  }, []);

  // ✅ Fetch book details by ID
  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`https://libarymanagement-dzib.onrender.com/api/auth/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // ✅ Update Book Function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://libarymanagement-dzib.onrender.com/api/auth/${id}`, book, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      alert("Book updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="edit-book-container">
      <h2>Edit Book</h2>
      <form onSubmit={handleUpdate}>
        <label>Title:</label>
        <input type="text" name="title" value={book.title} onChange={handleChange} required />

        <label>Author:</label>
        <input type="text" name="author" value={book.author} onChange={handleChange} required />

        <label>Genre:</label>
        <input type="text" name="genre" value={book.genre} onChange={handleChange} required />

        <label>Year:</label>
        <input type="number" name="year" value={book.year} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={book.description} onChange={handleChange} />

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
