angular.module('wyr', ['wyr.services','ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/home'); 

  //set up multiple views on the home page
  $stateProvider
    .state('home', {
      url:'/home',
      templateUrl: 'app/views/home.html'
    })
    .state('home.showQ', {
      url:'/showQ',
      templateUrl: 'app/views/home-showQ.html',
      controller: 'showQCtrl'
    })
    .state('home.submitQ', {
      url:'/submitQ',
      templateUrl: 'app/views/home-submitQ.html',
      controller: 'submitQCtrl'
    })
}])

.controller('showQCtrl', ['$scope','NextQ', 'HttpRequest','$http',  function ($scope, NextQ, HttpRequest, $http){

  //on page load, get all the questions
  //default: populate first question
  $http({
      method: 'GET',
      url: '/api/questions'
  }).then(function (res) {
      var questions= res.data; 
      $scope.questions= res.data;
      $scope.question= [$scope.questions[0].optionA,$scope.questions[0].optionB]; 
      $scope.nextQ= function () {
       $scope.question= NextQ.nextQ(questions);
       console.log('next q',questions); 
      } 
      return res.data; 
  }); 


  // $scope.question= ['Fall down every flight of stairs you encounter', 'Slam your hands in every door you encounter']; 
   

}])

.controller('submitQCtrl', ['$scope', 'NextQ', function ($scope, NextQ){
  $scope.testB= 'this works as well'; 
  $scope.addQ= function (optionA, optionB) {
    console.log('gets here'); 
    NextQ.addQ(optionA, optionB); 
  }
}])  

.factory('HttpRequest', function ($http) {
  var data= [];
  var getQuestions= function () {
    return $http({
      method: 'GET',
      url: '/api/questions'
    }).then(function (res) {
      console.log('res.data-- should contain all the qs', res.data)

      data= res.data; 
      return res.data; 
    }); 
  };
  var addQuestion= function (optionA, optionB) {
    return $http({
      method: 'POST',
      url: '/api/questions',
      data: {
        optionA: optionA,
        optionB: optionB
      }
    }); 
  }
  return {
    data: data,
    getQuestions: getQuestions,
    addQuestion: addQuestion
  };
})

.factory('NextQ', ['HttpRequest', function (HttpRequest) {

  var questions=[['Fall down every staircase you come across', 'Shut your hand in every door you open']]; 
  var idx=0; 
  //randomly pick the next question 
  var nextQ= function (questions) {
    var randomNum= function () { return Math.random()};
    var newIdx= Math.floor(questions.length * randomNum());

    console.log('new idx', newIdx); 

    return [questions[newIdx].optionA, questions[newIdx].optionB]; 
  };

  var addQ= function (optionA, optionB) {
    // questions.push([optionA, optionB]); 
    // console.log('questions', questions);

    HttpRequest.addQuestion(optionA, optionB); 
  };

  var getQ= function () {

    return HttpRequest.getQuestions();

  }

  return {
    nextQ: nextQ,
    addQ: addQ,
    getQ: getQ
  }
}])



