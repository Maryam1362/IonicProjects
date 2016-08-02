// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){
var app = angular.module('my-reddit', ['ionic', 'angularMoment']);
app.controller('RedditCtrl',function($http, $scope){

 $scope.Stories=[];
 
 $scope.loadOlderstories = function(){
  var params={};
  if($scope.Stories.length > 0){
    params['after']= $scope.Stories[$scope.Stories.length - 1].name;
  }
  $http.get('https://www.reddit.com/r/Android/new/.json',{params:params})
 .success(function(response){
  angular.forEach(response.data.children, function(child){
     $scope.Stories.push(child.data);
  });
   $scope.$broadcast('scroll.infiniteScrollComplete');
 });

 };
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());
