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
  $scope.question= ['Fall down every flight of stairs you encounter', 'Slam your hands in every door you encounter']; 
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
  var questions= [
    ['Fall down every staircase you come across', 'Shut your hand in every door you open'],
     ['Live in a nudist colony', 'Live with the Amish'], 
     ['Have hiccups for the rest of your life', 'Always feel like you have to sneez but are not able to'],
     ['Eat a potato and feel its pain','Be a potato and feel no pain'],
     ['Know when you are going to die','Know how you are going to die'],
     ['Be immortal','Be able to reincarnate every 100 years'],
     ['Be itchy forever','Have an eyelash get into your eye every five minutes'],
     ['Have the ability to fly, but every time you flew, you were naked','Have the ability to be invisible, but anytime you went invisible people nearby would talk shit about you'],
     ['Wipe with sandpaper','Wipe with saran wrap'],
     ['Work your dream job for no wages, relying only on welfare payments to survive','Sit naked in a completely empty white room from 8 to 5, Monday to Saturday for $5 million a year'],
     ['Watch porn with your parents','Watch porn OF your parents'],
     ['Fight a horse-sized duck', 'Fight a 1000 duck-sized horses'],
     ['Be rich, but live in a virtual world', 'Be poor, but live in the real world']
  ]; 
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

