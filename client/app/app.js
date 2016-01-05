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

.controller('showQCtrl', function ($scope){
  $scope.testA= 'this works'; 
})

.controller('submitQCtrl', function ($scope){
  $scope.testB= 'this works as well'; 
})  