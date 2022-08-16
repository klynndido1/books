# 1. Authors

## Before we begin

First, start the app and look at what I added for Books. There is a form + input for adding a book and a table that displays all the books that have been added. 

Open the chrome devtools and refresh the page. Notice that there is a `GET` request made to `/books`. This is what populates the data in the table. 

Now enter a title and click 'Add Book'. Notice that there is a `POST` request made to `/books`, follower by a `GET` request to `/books`. This creates the book and then reloads the data.


Open `client/src/Books.js` and try to locate the following code and answer the related questions:

- Makes a `GET` request to `/books` to load all books
  - How do you make HTTP requests from javascript?
  - What does `fetch` do? (this might be a long answer 🙃)
  - What does `useEffect` do?
- Renders the books in the table
  - How do you render an array of items in React?
  - What does `books.map` do?
  - Why do we pass a `key` prop inside `books.map`?
- Makes a `POST` request when the 'Add Book' button is clicked
  - How do we get the title from the input?
  - Why do we call `setTitle('')` after creating the book? (try removing it and see what happens when you submit the form)

Try to searching the web for the answers - for example, google will probably link you to the `useEffect` docs on reactjs.com)


## Assignment

Books are great but let's also start tracking Authors! This will be very similar to everything done for Books so use it as a reference.

### Create the database table
#### file: `server/db/init.js`

Just like Books, Authors need a database table. This is created in `server/db/init.js` with the sql in `createTableBook`. 

We will add a sql statement which creates our new table. Let's make a table named `author` with these columns:

- id: the unique identifier (PRIMARY KEY, every table needs this)
- name: text

Your `CREATE TABLE` statement should look a lot like `createTableBook`.

After you add the code to create your table, you can run it with the command `npm run db:init`.


### Add API routes
#### file: `server/index.js`


Just like Books, we need two API Routes:

- `GET /authors`: returns all authors from the database
- `POST /authors`: inserts a new author into the database

This code will be almost identical. The `GET` route will instead read from the `author` table. While the POST request sends `name` instead of `title`.

Here is how the POST body json differs
```
// book json body
{
  "title: "Great Expectations"
}

// author json body
{
  "name: "Charles Dickens"
}
```

### Create a React component for creating and displaying Authors

Your component should work just like the `<Book /> (client/src/Book.js)` component.

- A form where you can type in an Author name
- A submit button that when clicked creates the Author
- A table that shows all the authors

Gettings started:
- Create a file `client/src/Authors.js`
- Add a component named `Authors` and export it
- import the `Authors` component in the `<App /> (client/src/App.js)` component and render it below `<Books />`