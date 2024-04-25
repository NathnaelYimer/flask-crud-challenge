import React, { useState } from 'react';
import axios from 'axios';

function BookForm() {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: 0,
    category: '',
    publication_year: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/books', newBook);
      setNewBook({
        title: '',
        author: '',
        price: 0,
        category: '',
        publication_year: ''
      });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newBook.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newBook.author}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newBook.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newBook.category}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="publication_year"
          placeholder="Publication Year"
          value={newBook.publication_year}
          onChange={handleInputChange}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default BookForm;
