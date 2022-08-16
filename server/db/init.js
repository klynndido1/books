import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';
import prompts from 'prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilename = 'books.db';
const dbPath = path.resolve(__dirname, dbFilename);

if (fs.existsSync(dbPath)) {
  const response = await prompts({
    type: 'confirm',
    name: 'initialize',
    message: `Database '${dbFilename}' already exists. Erase '${dbFilename}' and reinitialize?`,
  });
  
  if (!response.initialize) {
    process.exit();
  }
}


console.log(`Creating the db file ${dbPath}...`);
fs.writeFileSync(dbPath, '');
const db = await sqlite.open({ filename: dbPath, driver: sqlite3.Database });

console.log('Creating the tables...');
const createTableBook = `
  CREATE TABLE book (
    id integer PRIMARY KEY,
    title text
  );
`;
console.log(`exec: ${createTableBook}`);
await db.exec(createTableBook);

// ASSIGNMENT: Make the Author table here!




