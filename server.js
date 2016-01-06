  var express     = require('express'),
      mongoose    = require('mongoose');

var app = express();

// connect to mongo database named questions - locally
// mongoose.connect('mongodb://127.0.0.1:27017/questions');

//connect to mongoLab
mongoose.connect(process.env.MONGOLAB_URI); 

// configure our server with all the middleware and and routing
require('./server/config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js

app.listen(process.env.PORT||8000);

module.exports = app;