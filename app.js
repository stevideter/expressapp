var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', 'src/views');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        list: ['a', 'e', 'i', 'o', 'u', 'sometimes y'],
        title: 'my title',
    });
});

app.get('/books', function (req, res) {
    res.send('Books be here');
});

app.listen(port, function (err) {
    console.log('running on port ' + port);

});
