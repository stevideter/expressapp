var express = require('express');
var bookRouter = express.Router();

var router = function(nav) {

    var books = [
        {
            title: 'Fight Club',
            genre: 'Fiction',
            author: 'Chuck Palahniuk',
            read: true
        },
        {
            title: 'American Gods',
            genre: 'Fiction',
            author: 'Neil Gaiman',
            read: true
        },
        {
            title: 'Something else',
            genre: 'Fiction',
            author: 'Someone Else',
            read: false
        }
    ];
    bookRouter.route('/')
        .get(function (req, res) {
            res.render('books', {
                nav: nav,
                title: 'My books',
                books: books
            });
        });
    bookRouter.route('/:id')
        .get(function (req, res) {
            var bookId = req.params.id;
            var book = books[bookId];
            res.render('book', {
                nav: nav,
                title: book.title,
                book: book,
                id: bookId
            });
        });
    return bookRouter;
};

module.exports = router;
