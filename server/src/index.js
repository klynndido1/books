import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";
import express from "express";
import bodyParser from "body-parser";

// Connect to the database
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilename = "books.db";
const dbPath = path.resolve(__dirname, `../db/${dbFilename}`);
const db = await sqlite.open({ filename: dbPath, driver: sqlite3.Database });

// Setup express
const app = express();
app.use(bodyParser.json());

app.get("/books", async (req, res) => {
  const books = await db.all("SELECT * FROM book;");
  res.json(books);
  console.log("hello");
});

app.post("/books", async (req, res) => {
  res.json({ Message: req.body.title });
});
app.get("/create-test-book", async (req, res) => {
  await db.run("INSERT INTO book (title) VALUES ('My Test Book')");
  res.json({});
});
// Start the server
const port = 4000 || process.env.PORT;
app.listen(port, () => {
  console.log(`books server is listening at http://localhost:${port}`);
});
