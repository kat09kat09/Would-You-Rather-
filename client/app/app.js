angular.module('wyr', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/home'); 

  //set up multiple views on the home page
  $stateProvider
    .state('home', {
      url:'/home',
      views: {
        'columnOne@showQ':  {
          templateUrl: 'showQ.html',
          controller: 'showQCtrl'
        },
        'columnTwo@submitQ': {
          templateUrl: 'submitQ.html',
          controller: 'submitQCtrl'
        }
      }
    })
})

.controller('showQCtrl', function ($scope){

})

.controller('submitQCtrl', function ($scope){

})  