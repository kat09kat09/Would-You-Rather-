var bodyParser  = require('body-parser'); 


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var questionsRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));


  app.use('/api/questions', questionsRouter); // use questions router for all questions request


  // inject our routers into their respective route files
  require('../questions/questionsRoutes.js')(questionsRouter);
};