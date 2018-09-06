// Imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;

// Instantiate server
var server = express();

//Body Parser coniguration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon server !</h1>');
});

server.use('/api/', apiRouter);

/*server.get ('/api/hello', (req, res) => { 
    res.send ({express: 'Bonjour de Express'}); 
  }); */

// Launch server
server.listen(8080, function() {
    console.log('Listening Server')
});