var express = require('express');

//Pour les routes
var app = express();

var radio = require('./routes/radios');


//page de base
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Petit exemple tout pourri');
});

app.get('/radios/:name', radio.findByName);
app.get('/radios/language/:language', radio.findByLanguage);

app.get('*', function(req, res){ //Page 404
	  res.status(404).send("Page not found, sorry.");
});

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}

//app.listen(8000);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;

app.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});