  var express     = require('express'),
      mongoose    = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/questions'); // connect to mongo database named questions

// configure our server with all the middleware and and routing
require('./server/config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js

app.listen(process.env.PORT||8000);

module.exports = app;