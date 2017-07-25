var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));

app.use(express.static('src/views'));
app.get('/', function(req, res){
    res.send('Hi from Express');
});

app.get('/books', function(req, res){
    res.send('Books be here');
});

app.listen(port, function(err) {
    console.log('running on port ' + port);

});
