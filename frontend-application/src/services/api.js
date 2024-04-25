// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace this with your backend URL
});

export const getBooks = async () => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (newBook) => {
  try {
    const response = await api.post('/books', newBook);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    await api.delete(`/books/${id}`);
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
