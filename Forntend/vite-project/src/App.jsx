import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import AddBook from "./component/AddBook";
import BookDetails from "./component/BookDetails";
import Navbar from "./component/Navbar";
import "./style.css"
import EditBook from "./component/EditBook";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/edit-book/:id" element={<EditBook/>}/>
      </Routes>
    </Router>
  );
};

export default App;
