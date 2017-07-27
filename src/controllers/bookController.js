var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/libraryApp';

var bookController = function (bookService, nav) {
    var middleware = function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };
    var getIndex = function (req, res) {
        mongodb.connect(url, function (err, db) {
            if (err) {
                res.status('404').send('cannot get books! ' + err.message);
            } else {
                var collection = db.collection('books');
                collection.find({}).toArray(function (err, results) {
                    if (err) {
                        res.status('404').send('cannot get books! ' + err.message);
                    } else {
                        res.render('books', {
                            nav: nav,
                            title: 'My books',
                            books: results
                        });
                    }
                    db.close();
                });
            }
        });
    };
    var getById = function (req, res) {
        var bookId = new ObjectId(req.params.id);
        mongodb.connect(url, function (err, db) {
            if (err) {
                res.status('404').send('cannot get book! ' + err.message);
            } else {
                var collection = db.collection('books');
                collection.findOne({'_id': bookId}, function (err, results) {
                    if (err) {
                        res.status('404').send('cannot get book! ' + err.message);
                    } else {
                        bookService.getBookById(results.bookId,
                            function (err, book) {
                                results.book = book;
                                res.render('book', {
                                    nav: nav,
                                    title: 'Books',
                                    book: results,
                                    id: req.params.id
                                });
                            });
                    }
                    db.close();
                });
            }
        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;