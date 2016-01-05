var questionsController = require('./questionsController.js');

module.exports = function (app) {
  // app === linkRouter injected from middleware.js

  app.route('/')
    .get(questionsController.allQuestions)
    .post(questionsController.newQuestion);

};
