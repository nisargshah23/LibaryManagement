import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    setRole(localStorage.getItem("role"));
  }, []);

  // ✅ Fetch Books from API
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books/");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // ✅ Delete Book Function
  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setBooks(books.filter(book => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container">
      <h2>Library Dashboard</h2>

      {/* Show "Add Book" button only if user is an Admin */}
      {role === "admin" && (
        <Link to="/add-book">
          <button>Add Book</button>
        </Link>
      )}

      <div className="book-list">
        {books.map(book => (
          <div className="book-card" key={book._id}>
            <img src={book.coverImage} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <Link to={`/book/${book._id}`}>View Details</Link>

            {/* Admin-only Edit & Delete buttons */}
            {role === "admin" && (
              <>
                <button onClick={() => navigate(`/edit-book/${book._id}`)}>Edit</button>
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
