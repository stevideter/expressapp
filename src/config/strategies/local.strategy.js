var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passportField: 'password'
    },
        function (username, password, done) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                if (err) {
                    done(err, null);
                } else {
                    var collection = db.collection('users');
                    collection.findOne({username: username},
                        function (err, results) {
                            if (err) {
                                done(err,null);
                            } else {
                                if (results.password !== password) {
                                    done(null, false, {message: 'invalid credentials'});
                                } else {
                                    var user = results;
                                    done(null, user);
                                }
                            }
                        });
                }
            });
        }));
};