
var routerApp = angular.module('routerApp', ['ui.router']);

var baseUrl = 'http://172.10.1.7:4046';

routerApp.config(function($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('/home');

    $stateProvider

        $stateProvider
       .state('home', {
           url: '/home',
                   templateUrl: "/client/app/home/home.html",
       })
       .state('submitAstory', {
           url: '/submitAstory/:id',
                   templateUrl: "/client/app/submitstory/submitAstory.html",
                  //  controller:'myctrl'
       })
       .state('topStories', {
           url: '/topStories',
                   templateUrl: "/client/app/topstory/topStories.html",
       })
       .state('contactUs', {
           url: '/contactUs',
                   templateUrl: "/client/app/contact/contactUs.html",
       })
       .state('about', {
           url: '/about',
                   templateUrl: "/client/app/about/about.html",
       })
       .state('login', {
           url: '/login',
                   templateUrl: "/client/app/login/login.html",
       })
       .state('register', {
           url: '/register',
                   templateUrl: "/client/app/register/register.html",
       })
      //  .state('edit', {
      //      url: '/edit/:employee',
      //              templateUrl: "/client/app/register/edit.html",
      //  })
});
routerApp.controller('myctrl', function($scope, $http) {
       $scope.user = {};
       $scope.submit = function(user) {
       console.log(user,'user');
       $http({
         method  : 'POST',
         url     : 'http://172.10.1.7:4046/employee/addEmployee',
         data    : $scope.user,
        })
}
});
routerApp.controller('myct', function($scope, $http,$location ,$stateParams)  {
   $scope.loademployee= function(){

     $http({method: 'GET', url: baseUrl + '/employee/getEmployee'})
       .then(function(response) {
         console.log(response);
         if(response.data.code==200){
           $scope.employees = response.data.data;
         }else{
           alert('No record found');
         }
       }, function(response) {
           alert('Error');

   });
}

$scope.deleteemployee = function(id,index){
      $http.delete('http://172.10.1.7:4046/employee/removeEmployee/'+id)
              .then(function(response){
               console.log(response);
               if(response.data.code==200){
                 console.log("data deleted");
                 $scope.employees.splice(index, 1);
               }else{
                 alert('not deleted');
               }
          });
      }
// $scope.getEmployee=function(){
//   console.log($stateParams.employee)
//   $http.get( baseUrl + '/employee/' +$stateParams.employee)
//   .then(function(response){
//          $scope.employee=response.data.data[0];
// })
// }
// $scope.editEmployee=function(id){
//     console.log(id);
//     $location.path('/edit/'+id)
//
//   }
// $scope.edit=function(employee){
//     $http.put('http://172.10.1.7:4046/employee/updateEmployee/'+employee._id,employee)
//     .then(function(response){
//       console.log("updated");
//
//     },
//     function(response){
//       console.log("not");
//     });
//   }


  });
