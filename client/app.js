var storyApp  = angular.module('storyApp', ['ui.router' ,'ngFileUpload','angular-rating', 'ngResource','angularUtils.directives.dirPagination','toastr','ngMessages','ngSanitize','angularTrix']);
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
      return $resource(baseurl+'/user/getStory');
    },
    addStory:function(){
      return $resource(baseurl+'/user/addStory');
    },
    deleteStory:function(id){
      return $resource(baseurl+'/user/removeStory/'+id);
    },
    getaStory:function(){
      return $resource(baseurl+'/user/'+$stateParams.id);
    },
    editStory:function(id,story){
      return $resource(baseurl+'/user/updateStory/'+$stateParams.id,story);
    },
    comment:function(id,Comment){
      return $resource(baseurl+ '/user/addComment/'+ id,Comment);
    },
    approvedStory:function(id,isapproved){
      return $resource(baseurl+'/user/approvedStory/'+id+"?isapproved="+isapproved);
    }
    }
  });

  storyApp.config(function($stateProvider,$urlRouterProvider,$httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
        var auth = function(isadmin){
          return["$q", "$timeout", "$http", "$location", "$rootScope",function($q, $timeout, $http, $location, $rootScope){
          var deferred = $q.defer();
          $http.get('http://172.10.1.7:4046/user/auth').then(function(response) {
            console.log(response);
            if(response.data.user){
              var user=response.data.user;
              if(user.isAdmin==isadmin){
                    deferred.resolve();
              }else{
                if (user.isAdmin == 'true') {
                  $location.path('/admin')
                } else {
                  $location.path('/home');
               }
             }
            }else{
              $location.path('/login');
            }
          });
          return deferred.promise;
        }];
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
                templateUrl:"/client/app/home/home.html"
        },
        "footer":{
                templateUrl:"/client/app/shared/footer.html"
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
                   templateUrl:"/client/app/submitstory/story.html"
         },
         "footer":{
                   templateUrl:"/client/app/shared/footer.html"
         }
      },
      resolve: {
          auth : auth(false)
      }
  })
  //   .state('topStories', {
  //        url: '/topStories',
  //        views:{
  //        "header": {
  //                  templateUrl:"client/app/shared/header.html"
  //        },
  //        "sidebar":{
  //                  templateUrl:"client/app/shared/sidebar.html"
  //        },
  //        "content":{
  //                   templateUrl: "/client/app/topstory/topStories.html"
  //        },
  //        "footer":{
  //                 templateUrl: "/client/app/shared/footer.html"
  //        }
  //     }
  //  })
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
                  templateUrl:"/client/app/contact/contactUs.html"
         },
         "footer":{
                  templateUrl:"/client/app/shared/footer.html"
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
                  templateUrl:"/client/app/about/about.html"
         },
         "footer":{
                  templateUrl:"/client/app/shared/footer.html"
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
                     templateUrl:"/client/app/login/login.html"
           },
           "footer":{
                    templateUrl:"/client/app/shared/footer.html"
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
                     templateUrl:"/client/app/register/register.html"
           },
           "footer":{
                    templateUrl:"/client/app/shared/footer.html"
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
                      templateUrl:"/client/app/register/edit.html",
             },
             "footer":{
                      templateUrl:"/client/app/shared/footer.html"
            }
            },resolve: {
              auth : auth(false)
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
                      templateUrl:"/client/app/admin/userupdate.html",
             },
             "footer":{
                      templateUrl:"/client/app/shared/footer.html"
             }
        },
        resolve: {
            auth : auth(false)
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
                      templateUrl:"/client/app/admin/userview.html",
             },
             "footer":{
                      templateUrl:"/client/app/shared/footer.html"
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
                      templateUrl:"/client/app/admin/admin.html",
             },
             "footer":{
                      templateUrl:"/client/app/shared/footer.html"
             }
             },
             resolve: {
                 auth : auth(true)
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
                          templateUrl:"/client/app/user/userprofile.html",
              },
              "footer":{
                       templateUrl:"/client/app/shared/footer.html"
                  }
              },
              resolve: {
                  auth : auth(false)
              }
        })
    });


storyApp.controller('myController', function($scope, $http, $location, $stateParams, $resource, storyService, toastr) {
  var token = localStorage.getItem('webToken');
  var role = localStorage.getItem('Role');
  if (token != null && role == 'true') {
    $scope.isAdminLogin = true;
    $scope.isuserlogin = false;


  } else if (token != null && role == 'false') {
    $scope.isuserlogin = true;
    $scope.isAdminLogin = false;
     console.log(token," != null && ",role," == 'false'");

  } else {
    $scope.isuserlogin = false;
    $scope.isAdminLogin = false;

  }
  $scope.logout = function() {
    localStorage.removeItem('webToken');
    localStorage.removeItem('Role');
    toastr.success("logged out successfully");
    window.location = '/home';
  };
});


storyApp.controller('myct', function($scope,$window, $http,$location ,$stateParams,$resource,storyService,toastr){
$scope.stories=[];
  $scope.getst = function()
    {

 var role = localStorage.getItem('Role');
   var obj=(role=='true')?{isAdmin:true}:{};
       storyService.getStory().get(obj,function(response){
         console.log(response);
         if(response.code==200){
            $scope.stories = response.data;
            }else{
                 alert('No record found');
                 toastr.warning('no record found', 'Warning')
            }
               },function(response){
                 toastr.error('error', 'Error');
      });
  }

  $scope.comment=function(id,Comment){
      console.log(id);
        console.log(Comment);
  storyService.comment(id).save({Comment},function(response){
        if(response.code==200){
      toastr.success('success', "comment successfully");
        $scope.getst();
      }
        else{
         toastr.warning('error', "comment failed");
          }
       })
    }


    var events = ['trixInitialize', 'trixChange', 'trixSelectionChange', 'trixFocus', 'trixBlur', 'trixFileAccept', 'trixAttachmentAdd', 'trixAttachmentRemove'];

        for (var i = 0; i < events.length; i++) {
            $scope[events[i]] = function(e) {
                console.info('Event type:', e.type);
            }
        };

        var createStorageKey, host;
        createStorageKey = function(file) {
            var date, day, time;
            date = new Date();
            day = date.toISOString().slice(0, 10);
            time = date.getTime();
            return "tmp/" + day + "/" + time + "-" + file.name;

        };

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
             $scope.getst()
            }else{
                 alert('No record found');
                 toastr.warning('no record found', 'Warning');
            }
                 }, function(response) {
                    toastr.error('got an error', 'Error');
            });
                      window.location = '/';
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
               },function(response){
                 toastr.error('got an error', 'Error');
            });
                 }else{
                     toastr.warning('You Cancelled!No Change');
       }
  }
  $scope.approvedStory = function(id,isapproved){
      var sure=confirm("are you sure ?");
         if(sure){
           isapproved=(isapproved==1)?true:false;
           storyService.approvedStory(id,isapproved).get(function(response){
            console.log(response);
            if(response.code==200){
              // console.log("story deleted");
              // $scope.stories.splice(index, 1);
              // toastr.success('Data deleted successfully', 'information');
              }else{
            //  console.log("not deleted");
            //  toastr.warning('rdata not deleted', 'Warning');
             }
          },function(response){
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
                   toastr.warning('record not updated', 'Warning');
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
storyApp.controller('UserCtrl', function($scope,Upload,$http,$location,$rootScope ,$stateParams,$resource,storyService,toastr)
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
         }, function(error)
            {
            toastr.error(error, 'Error');
      });
}
    $scope.register= function(user){
   console.log(user,'user');
     storyService.regUser().save(user,function(response){
       console.log(response);
          if(response.code==200){
            $scope.users = response.data;
              toastr.success('registration success', 'information');
               $location.path('/login')
         }else{
                $location.path('/register');
         toastr.warning('user is already exists', 'Warning');

          }
        }, function(response) {
         toastr.error('got an error', 'Error');
      });

  }
  $scope.login= function(user){
     storyService.loginUser().save(user,function(response){
      if(response.code == 200)
      {
        /* step-2 save token */
        localStorage.setItem('webToken', response.data.token);
        localStorage.setItem('Role', response.data.role);
        toastr.success(response.message);
        $location.path('/home')
      }
      else
      {
        toastr.error('email or password is wrong');
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

 $scope.editUsr=function(){
   console.log();
   $location.path('/userupdate')
 }

 $scope.getuser=function(){
       storyService.getaUser().get(function(response){
         console.log('now',response.data);
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
   console.log('userProfile',response);

     if(response.code==200){
        $scope.user=response.data;
         $scope.Story=response.data.story;
        console.log("---->",$scope.Story);
      }else{
           console.log("no record found");
        }
    });
  }
  $scope.upload = function (file) {
    console.log(file);
      Upload.upload({
          url: 'http://172.10.1.7:4046/user/uploadAvatar',
          data: {file: file}
      }).then(function (resp) {
          console.log('File uploaded successfully' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data.filename);
           $scope.getpro()
      }, function (resp) {
          // console.log('Error status: ' + resp.status);
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress:' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };
});
