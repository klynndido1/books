import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Connect to the database
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilename = "books.db";
const dbPath = path.resolve(__dirname, `../db/${dbFilename}`);
const db = await sqlite.open({ filename: dbPath, driver: sqlite3.Database });

// Setup express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Start the server
const port = 4000 || process.env.PORT;
app.listen(port, () => {
  console.log(`books server is listening at http://localhost:${port}`);
});


/** Books API Routes */
app.get("/books", async (req, res) => {
  const books = await db.all("SELECT * FROM book;");
  res.json(books);
});

app.post("/books", async (req, res) => {
  const result = await db.run(`INSERT INTO book (title) VALUES (:title)`, {
    ':title': req.body.title
  });

  // get the book we just made from the database
  const newBook = await db.get('SELECT * FROM book WHERE id = :id', {
    ':id': result.lastID
  });
  
  res.json(newBook);
});


/** ASSIGNMENT: Author API Routes go here */