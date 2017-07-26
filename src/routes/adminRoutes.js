var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
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

var router = function(nav) {
    adminRouter.route('/addBooks')
        .get(function(req,res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                if (err) {
                    res.status('404').send('cannot open database! ' + err.message);
                } else {
                    var collection = db.collection('books');
                    collection.insertMany(books, function(err, results) {
                        if (err) {
                            res.status('404').send('problem adding books! ' + err.message);
                        } else {
                            res.send(results);
                        }
                        db.close();
                    });
                }

            });
        });
    return adminRouter;
};

module.exports = router;