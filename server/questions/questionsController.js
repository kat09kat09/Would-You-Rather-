var Questions = require('./questionsModel.js'),
    Q    = require('q'); 

module.exports = {

  allQuestions: function (req, res, next) {
  var findAll = Q.nbind(Questions.find, Questions);

  findAll({})
    .then(function (questions) {
      console.log('responding with all questions')
      res.json(questions);
    })
    .fail(function (error) {
      next(error);
    });
  },

  newQuestion: function (req, res, next) {
    var optionA = req.body.optionA;
    var optionB = req.body.optionB; 
    console.log(req.body);

    //creates a promise-returning fxn from a Node.js style method
    //binds it to provided arguments
    var createQuestion = Q.nbind(Questions.create, Questions);
    var findQuestion = Q.nbind(Questions.findOne, Questions);

    //need to figure out what the format of optionAB is in... perhaps an array?
    //need to correctly pass in the options to optionA or optionB
    createQuestion({optionA: optionA, optionB: optionB})
      .then(function () {
          new Question({
            optionA: optionA,
            optionB: optionB,
          })
          .save (function (err, question){
            //redirect page back to index after record is created
            console.log('redirecting to home'); 
            res.redirect('/')
          })
      })
  }
}