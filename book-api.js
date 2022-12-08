const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let books = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;

    // output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

app.get('/book', (req, res) => {
    res.json(books);
});

app.get('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;

    // searching books for the isbn
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});

app.delete('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;

    // remove item from the books array
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }

        return false;
    });

    // sending 404 when not found something is a good practice
    res.send('Book is deleted');
});

app.post('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    // remove item from the books array
    for (let i = 0; i < books.length; i++) {
        let book = books[i]

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    // sending 404 when not found something is a good practice
    res.send('Book is edited');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));