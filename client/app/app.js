angular.module('wyr', ['ui.router'])

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

.controller('showQCtrl', ['$scope', 'NextQ', function ($scope, NextQ){
  $scope.testA= 'this works'; 
  $scope.question= ['option A', 'option B']; 
  $scope.nextQ= function () {
    $scope.question= NextQ.nextQ();
  }  

}])

.controller('submitQCtrl', ['$scope', 'NextQ', function ($scope, NextQ){
  $scope.testB= 'this works as well'; 
  $scope.addQ= function (optionA, optionB) {
    console.log('gets here'); 
    NextQ.addQ(optionA, optionB); 
  }
}])  

.factory('NextQ', function () {
  var questions= [['option A', 'option B'], ['option C', 'option D']]; 
  var idx=0; 
  var nextQ= function () {
    idx++; 
    if(idx>= questions.length) {
      idx=0; 
    }
    return questions[idx]; 
  };

  var addQ= function (optionA, optionB) {
    questions.push([optionA, optionB]); 
    console.log('questions', questions); 
  };

  return {
    nextQ: nextQ,
    addQ: addQ
  }
})

