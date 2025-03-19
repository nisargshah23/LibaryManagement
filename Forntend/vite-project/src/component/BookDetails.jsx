import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error("Error fetching book:", error));
  }, [id]);

  if (!book) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>{book.description}</p>
      <img src={book.coverImage} alt={book.title} />
      <Link to="/dashboard"><button>Back</button></Link>
    </div>
  );
}

export default BookDetails;
