import React from 'react';
import './App.css';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

function App() {
  return (
    <div className="App">
      <h1>Book Management App</h1>
      <BookList />
      <BookForm />
    </div>
  );
}

export default App;

