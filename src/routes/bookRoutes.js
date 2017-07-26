var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function(nav) {
    var url = 'mongodb://localhost:27017/libraryApp';

    bookRouter.route('/')
        .get(function (req, res) {
            mongodb.connect(url, function(err, db) {
                    if (err) {
                        res.status('404').send('cannot get books! ' + err.message);
                    } else {
                        var collection = db.collection('books');
                        collection.find({}).toArray(function(err, results) {
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
        });
    bookRouter.route('/:id')
        .all(function(req, res, next) {
            var bookId = new ObjectId(req.params.id);
            mongodb.connect(url, function(err, db) {
                    if (err) {
                        res.status('404').send('cannot get book! ' + err.message);
                    } else {
                        var collection = db.collection('books');
                        collection.findOne({'_id': bookId}, function(err, results) {
                            if (err) {
                                res.status('404').send('cannot get book! ' + err.message);
                            } else {
                                req.book = results;
                                next();
                            }
                            db.close();
                        });
                    }
                });
        })
        .get(function (req, res) {
            res.render('book', {
                nav: nav,
                title: req.book.title,
                book: req.book,
                id: req.params.id
            });
        });
    return bookRouter;
};

module.exports = router;
