var storyApp  = angular.module('storyApp', ['ui.router' , 'ngResource','angularUtils.directives.dirPagination','toastr','ngMessages']);
var baseurl ='http://172.10.1.7:4046';
storyApp.factory('httpRequestInterceptor', function ($q,$rootScope,$location) {

  return {
    request: function (config) {
      if(localStorage.getItem('webToken'))
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('webToken')
       return config;
     },
     response: function (response) {

         var curPath = $location.path();
         $rootScope.curPage = curPath;
         if (response.data.code == 200) {
             $rootScope.isLoading = true;
             console.log(response);
         }else {
             $rootScope.isLoading = false;
         }
         return response || $q.state(response);
     }
};
});
storyApp.factory("storyService",function($resource,$stateParams){
  return{
    getUser:function(){
      return $resource(baseurl+'/user/getUser');
    },
    regUser:function(){
      return $resource(baseurl+'/user/register');
    },
    loginUser:function(user){
      return $resource(baseurl+'/user/login',user);
    },
    editUser:function(user){
      return $resource(baseurl+'/user/updateUser',user);
    },
    getaUser:function(){
      return $resource(baseurl+'/user');
    },
    deleteUser:function(id){
    return $resource(baseurl+'/user/removeUser/'+id);
    },
    getUserprofile:function(){
      return $resource(baseurl+'/user/userprofile');
    },
    getStory:function(){
      return $resource(baseurl+'/story/getStory');
    },
    addStory:function(){
      return $resource(baseurl+'/story/addStory');
    },
    deleteStory:function(id){
      return $resource(baseurl+'/story/removeStory/'+id);

    },
    getaStory:function(){
      return $resource(baseurl+'/story/'+$stateParams.id);
    },
    editStory:function(id,story){
      return $resource(baseurl+'/story/updateStory/'+$stateParams.id,story);
    }
    }
  });

  storyApp.config(function($stateProvider,$urlRouterProvider,$httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
        var auth = function($q, $timeout, $http, $location, $rootScope) {
          var deferred = $q.defer();
          $http.get('http://172.10.1.7:4046/user/auth').then(function(response) {
              deferred.resolve();
          });
          return deferred.promise;
      };


    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home', {
        url: '/home',
        views:{
        "header":{
                templateUrl:"client/app/shared/header.html"
        },
        "sidebar":{
                templateUrl:"client/app/shared/sidebar.html"
        },
        "content":{
                templateUrl: "/client/app/home/home.html"
        },
        "footer":{
                templateUrl: "/client/app/shared/footer.html"
        }
        }
    })
    .state('submitAstory', {
         url:'/submitAstory',
         views:{
         "header": {
                   templateUrl:"client/app/shared/header.html"
         },
         "sidebar":{
                   templateUrl:"client/app/shared/sidebar.html"
         },
         "content":{
                   templateUrl: "/client/app/submitstory/story.html"
         },
         "footer":{
                   templateUrl: "/client/app/shared/footer.html"
         }
      },
      resolve: {
          auth : auth
      }
  })
    .state('topStories', {
         url: '/topStories',
         views:{
         "header": {
                   templateUrl:"client/app/shared/header.html"
         },
         "sidebar":{
                   templateUrl:"client/app/shared/sidebar.html"
         },
         "content":{
                    templateUrl: "/client/app/topstory/topStories.html"
         },
         "footer":{
                  templateUrl: "/client/app/shared/footer.html"
         }
      }
   })
   .state('contactUs', {
         url: '/contactUs',
         views:{
         "header": {
                   templateUrl:"client/app/shared/header.html"
         },
         "sidebar":{
                   templateUrl:"client/app/shared/sidebar.html"
         },
         "content":{
                  templateUrl: "/client/app/contact/contactUs.html"
         },
         "footer":{
                  templateUrl: "/client/app/shared/footer.html"
         }
      }
   })
   .state('about', {
         url: '/about',
         views:{
         "header": {
                   templateUrl:"client/app/shared/header.html"
         },
         "sidebar":{
                   templateUrl:"client/app/shared/sidebar.html"
         },
         "content":{
                  templateUrl: "/client/app/about/about.html"
         },
         "footer":{
                  templateUrl: "/client/app/shared/footer.html"
          }
        }

     })
   .state('login', {
           url: '/login',
           views:{
           "header": {
                     templateUrl:"client/app/shared/header.html"
           },
           "sidebar":{
                     templateUrl:"client/app/shared/sidebar.html"
           },
           "content":{
                     templateUrl: "/client/app/login/login.html"
           },
           "footer":{
                    templateUrl: "/client/app/shared/footer.html"
            }
          }
       })
    .state('register', {
           url: '/register',
           views:{
           "header": {
                     templateUrl:"client/app/shared/header.html"
           },
           "sidebar":{
                     templateUrl:"client/app/shared/sidebar.html"
           },
           "content":{
                     templateUrl: "/client/app/register/register.html"
           },
           "footer":{
                    templateUrl: "/client/app/shared/footer.html"
          }
        }
     })
    .state('edit', {
           url: '/edit/:id',
           views:{
             "header": {
                       templateUrl:"client/app/shared/header.html"
             },
             "sidebar":{
                       templateUrl:"client/app/shared/sidebar.html"
             },
             "content": {
                      templateUrl: "/client/app/register/edit.html",
             },
             "footer":{
                      templateUrl: "/client/app/shared/footer.html"
            }
        }
    })
    .state('userupdate', {
           url: '/userupdate',
           views:{
             "header": {
                       templateUrl:"client/app/shared/header.html"
             },
             "sidebar":{
                       templateUrl:"client/app/shared/sidebar.html"
             },
             "content": {
                      templateUrl: "/client/app/admin/userupdate.html",
             },
             "footer":{
                      templateUrl: "/client/app/shared/footer.html"
             }
        }
    })
    .state('userview', {
           url: '/userview',
           views:{
             "header": {
                       templateUrl:"client/app/shared/header.html"
             },
             "sidebar":{
                       templateUrl:"client/app/shared/sidebar.html"
             },
             "content": {
                      templateUrl: "/client/app/admin/userview.html",
             },
             "footer":{
                      templateUrl: "/client/app/shared/footer.html"
             }
        }
    })
    .state('admin', {
           url: '/admin',
           views:{
             "header": {
                       templateUrl:"client/app/shared/header.html"
             },
             "sidebar":{
                       templateUrl:"client/app/shared/sidebar.html"
             },
            "content": {
                      templateUrl: "/client/app/admin/admin.html",
             },
             "footer":{
                      templateUrl: "/client/app/shared/footer.html"
             }
             },
             resolve: {
                 auth : auth
             }
         })
     .state('userprofile', {
            url: '/userprofile',
            views:{
              "header": {
                        templateUrl:"client/app/shared/header.html"
              },
              "sidebar":{
                        templateUrl:"client/app/shared/sidebar.html"
              },
              "content": {
                          templateUrl: "/client/app/user/userprofile.html",
              },
              "footer":{
                       templateUrl: "/client/app/shared/footer.html"
                  }
              },
              resolve: {
                  auth : auth
              }
        })
    });




storyApp.controller('myController', function($scope,$http,$location,$stateParams,$resource,storyService,toastr){
    var token = localStorage.getItem('webToken');
       if(token!= null){
         $scope.isuserlogin = true;
         }else{
              $scope.isuserlogin = false;
         }
              $scope.logout = function(){
              localStorage.removeItem('webToken');
              toastr.success("You are logout");
              window.location = '/';
       };
});


storyApp.controller('myct', function($scope, $http,$location ,$stateParams,$resource,storyService,toastr){
$scope.stories=[];
  $scope.getst = function()
    {
       storyService.getStory().get(function(response){
         console.log(response);
         if(response.code==200){
            $scope.stories = response.data;
            }else{
                 alert('No record found');
                 toastr.warning('no record found', 'Warning');
            }
               },function(response){
                 toastr.error('error', 'Error');
      });
  }

$scope.newStory=function(){
    $location.path('/submitAstory')
  }
     $scope.addStory = function(story){
       console.log(story,'story');
       storyService.addStory().save(story,function(response){
         console.log(response);
         if(response.code==200){
            $scope.stories = response.data;
            toastr.success('Data Added successfully', 'information');
            }else{
                 alert('No record found');
                 toastr.warning('no record found', 'Warning');
            }
                 }, function(response) {
                    toastr.error('got an error', 'Error');
            });
                    $location.path('/home')
}

$scope.deleteStory = function(id,index){
    var sure=confirm("are you sure ?");
       if(sure){
       storyService.deleteStory(id,index).delete(function(response){
          console.log(response);
          if(response.code==200){
            console.log("story deleted");
            $scope.stories.splice(index, 1);
            toastr.success('Data deleted successfully', 'information');
            }else{
                 console.log("not deleted");
                 toastr.warning('rdata not deleted', 'Warning');
           }
               },function(response)
           {
                 toastr.error('got an error', 'Error');
       });
                 }else{
                     toastr.warning('You Cancelled!No Change');
      }
  }
$scope.editStory=function(id){
  console.log(id);
  $location.path('/edit/'+id)
}
  $scope.getstr=function(){
      storyService.getaStory($stateParams.id).get(function(response){
          if(response.code==200){
             $scope.story=response.data[0];
             }else{
                  console.log("error");
                  toastr.error('error', 'Error');
            }
      });
  }

$scope.edit=function(story){
    storyService.editStory($stateParams.id).save(story,function(response){
        if(response.code==200)
          {
             console.log("updated")
             toastr.success('record updated successfully',"Information");
             }else{
                   console.log("not updated")
                   toastr.warning('redord not updated', 'Warning');
             }
                 },function(response){
                   console.log("error")
                   toastr.error('error', 'Error');
           })
                   $location.path('/home')
        }
                   $scope.back=function(){
                    $location.path('/home')
     }
});
storyApp.controller('UserCtrl', function($scope, $http,$location ,$stateParams,$resource,storyService,toastr)
 {

   $scope.getall= function(user)
{
   storyService.getUser().get(function(response){
    console.log(response);
      if(response.code==200){
         $scope.users = response.data;
           }else{
             alert('No record found');
              toastr.warning('no record found', 'Warning');
           }
         }, function(response)
            {
            toastr.error('error', 'Error');
      });
}
    $scope.register= function(user)
{
   console.log(user,'user');
     storyService.regUser().save(user,function(response){
       console.log(response);
          if(response.code==200){
            $scope.users = response.data;
              toastr.success('Data Added successfully', 'information');
      }else{
        alert('No record found');
         toastr.warning('no record found', 'Warning');
          }
        }, function(response) {
         toastr.error('got an error', 'Error');

      });
         $location.path('/login')
  }
  $scope.login= function(user){
     storyService.loginUser().save(user,function(response){
      if(response.code == 200)
      {
        /* step-2 save token */
        localStorage.setItem('webToken', response.data.token);
        toastr.success(response.message);
        $location.path('/home')
      }
      else
      {
        toastr.info('Sorry try again');
      }
    })
  }


  $scope.deleteuser = function(id,index){
    var sure=confirm("are you sure ?");
    if(sure){
     storyService.deleteUser(id,index).delete(function(response){
       console.log(response);
       if(response.code==200)
       {
         console.log("user deleted");
           $scope.users.splice(index, 1);
            toastr.success('Data deleted successfully', 'information');
       }else{
         console.log("not deleted");
            toastr.warning('rdata not deleted', 'Warning');
       }
         },function(response)
       {
         toastr.error('got an error', 'Error');
    });
  }
  else {
        toastr.warning('You Cancelled!No Change');
  }
 }
//  $scope.editUsr=function(id){
//    console.log(id);
//    $location.path('/userupdate/'+id)
//  }
//  $scope.getusr=function(){
//    storyService.getaUser($stateParams.id).get(function(response){
//      if(response.code==200){
//      $scope.user=response.data[0];
//    }else{
//      console.log("error");
//      toastr.error('error');
//    }
//  });
// }
//
// $scope.updateuser=function(user){
// storyService.editUser($stateParams.id).save(user,function(response){
//   if(response.code==200)
//     {
//        console.log("updated")
//        toastr.success('record updated successfully',"Information");
//        }else{
//             console.log("not updated")
//             toastr.warning('record not updated', 'Warning');
//        }
//   },
//   function(response){
//     console.log("error")
//     toastr.error('error', 'Error');
//     })
//     $location.path('/home')
//  }
 $scope.editUsr=function(){
   console.log();
   $location.path('/userupdate')
 }
 $scope.getuser=function(){
   storyService.getaUser().get(function(response){
     console.log(response.code);
     if(response.code==200){
       console.log(response.code);
     $scope.user=response.data;
   }else{
     console.log("error");
     toastr.error('error');
   }
 });
}

$scope.updateuser=function(user){
storyService.editUser().save(user,function(response){
  if(response.code==200)
    {
       console.log("updated")
       toastr.success('record updated successfully',"Information");
       }else{
            console.log("not updated")
            toastr.warning('record not updated', 'Warning');
       }
  },
  function(response){
    console.log("error")
    toastr.error('error', 'Error');
    })
    $location.path('/userprofile')
 }
    $scope.bac=function(){
    $location.path('/home')
  }
  $scope.getpro=function(){
  storyService.getUserprofile().get(function(response){
   console.log(response);
     if(response.code==200){
        $scope.user=response.data;
      }else{
           console.log("no record found");
        }
    });
  }
});
