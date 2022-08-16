import React, { useState, useEffect } from 'react'
import './Books.css';

export const Books = () => {

  const [books, setBooks] = useState([])
  const getBooks = async () => {
    // request all books
    const res = await fetch('http://localhost:4000/books', {
      method: 'GET',
    });
    // convert the reponse body to json
    // resBody will be an array of 'books'
    const resBody = await res.json();
    setBooks(resBody);
  }

  // start loading books as soon as the page loads
  useEffect(() => {
    getBooks();
  }, []);



  const [title, setTitle] = useState('');
  const addBook = async () => {
    // send a HTTP POST request to `/books`
    // the body of the request will be a json object with `title`
    await fetch('http://localhost:4000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title }),
    });

    // reload the books
    getBooks();

    // clear the text input
    setTitle('');
  }

  return (
    <div className="Books">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          addBook();
        }}
      >
        <h2>Add a book</h2>
        <input 
          type="text" 
          name="title" 
          required
          placeholder='Title'
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }} 
        />
        <button type="submit">Add Book</button>
      </form>

      <main>
        <h2>Books</h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: '50px' }}>ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}