var UserModel = require("./../models/User");
var jsonwebtoken = require('jsonwebtoken');
var StoryModel = require("./../models/story");
var CommentModel = require("./../models/comments");
var path = require('path');
var fs = require('fs');

exports.getUser = function(req, res){
UserModel.find({}).populate("story").exec(function(err, User){
   if(err){
    	    res.json({code: 400, message: "Error occurred"});
          }else{
            	res.json({code: 200, message: "records found",data:User});
         }
    })
}

exports.auth=function(req,res){
  if(req.headers.authorization.split(" ").length==2){
    var token=req.headers.authorization.split(" ")[1]
    jsonwebtoken.verify(token, 'shhhhh', function(err, decoded) {
      if (err) {
         res.json({code:302,message:"internal error"});
      } else {
        UserModel.findOne({'_id':decoded.id}).exec(function(err, user)
          {
             if(user){
              //  req.session["user"]=user;
              //  console.log(req.session)
               res.json({code:200,message:"Ok",user:user});
               } else {
                 res.json({code:302,message:"failed"});
               }
          });

        }
    });
  }else {
    res.json({code:302,message:"failed"});
  }

}
exports.addUser = function(req, res){
  var User = new UserModel(req.body);
    User.save(function (err)
     {
     if(err){
           res.json({code:400,message:"error"});
           }else{
                res.json({code:200,message:"created",data:User});
           }
      })
}

exports.getUserById = function(req, res){
  //  var id=req.params.id;
     UserModel.findOne({'_id':req.user.id}).exec(function(err, User){
       if(err){
       	      res.json({code: 400, message: "Error occurred"});
              }else{

	                 res.json({code: 200, message: "records found",data:User});
                   }
      })
}

exports.updateUser = function(req, res){
  console.log("updateUser", req.user.id, req.body);
    UserModel.update({'_id':req.user.id}, { $set:req.body }, function(err, User){
    if(err){
           res.json({code: 404, message: err});
           }else{
           res.json({code: 200, data:User });
        }
    })
}

exports.removeUser = function(req, res){
    console.log("removeUser", req.params.id, req.body);
    UserModel.remove({_id: req.params.id},function (err ,User){
    if(err){
           res.json({code:400,message:"error"});
           }else{
                res.json({code:200,message:"removed",data:User});
          }
    })
}

  exports.regUser = function(req, res){
    UserModel.findOne({email:req.body.email, password:req.body.password}).exec(function(err ,User)
     {
       if (err) {
           res.json({
               type: false,
               message: "Error occured: " + err
           });
       } else {
           if (User) {
               res.json({
                   type: false,
                   message: "User already exists!"
               });
           } else {
               var User = new UserModel(req.body);
               User.save(function (err,user){
                 if (err){
                       res.json({code:400,message:"error"});
                       }else{
                              res.json({code:200,message:"User Added successfully",data:user});
                         }
                   })
             }
        }
   });
}

exports.logUser = function(req, res){
    UserModel.findOne({email:req.body.email, password:req.body.password}).exec(function(err ,User)
     {
       if(err){
       console.log(error)
       res.json({code:400,message:"error"});
       }else if(User){
        //  req.session["user"]=User;
            /*step-1 create token*/
             var payload = {
             id : User._id
             };
             console.log(payload);
             var token = jsonwebtoken.sign(payload, 'shhhhh');
             console.log(token);
             res.json({
             code:200,
             message: 'Succesfully Logged in',
             data :{token: token,
               role:User.isAdmin
              }});
             }else{
                  res.json({code:404,message:"email or passwod is wrong"});
            }
       });
    }

  exports.getuserProfile = function(req, res){

    UserModel.findOne({'_id':req.user.id}).populate("story").exec(function(err, user)
      {
         if(user){
            res.json({code: 200, message: "records found",data:user});
             } else {
                   res.json({code: 400, message: "Error occurred"});
           }
      });
   }

   exports.getUserComment = function(req, res){

    CommentModel.find().exec(function(err, user)
       {
          if(user){
             res.json({code: 200, message: "records found",data:user});
              } else {
                    res.json({code: 400, message: "Error occurred"});
            }
       });
    }


  //  exports.loveStory = function(req, res){
  //    StoryModel.find({category:{$eq:"love"}}).exec(function(err, user)
  //          {
  //             if(user){
  //                res.json({code: 200, message: "records found",data:user});
  //                 } else {
  //                       res.json({code: 400, message: "Error occurred"});
  //               }
  //          });
  //       }


    exports.postComment = function(req, res){
        var User = new   CommentModel(req.body);

        console.log(req.body);
        User.save(function (err){
          if (err){
                res.json({code:400,message:"error"});
                }else{
                       res.json({code:200,message:"created",data:User});
                  }
            })
      }

   exports.getStory = function(req, res)
   {
     console.log('iam here --->',req.query);
     var obj=(req.query.isAdmin)?{}:{isApproved:true};
     console.log(req.query.isAdmin,"---------->",obj);
   StoryModel.find(obj).deepPopulate('comment comment.by name').exec(function(err, story)
   {
      if(err){
         res.json({code: 400, message: "Error occurred"});
       }
     else{
     res.json({code: 200, message: "records found",data:story});
         }

     })
   }


   exports.addStory = function(req, res) {
     var story = new StoryModel(req.body);
     story.name=req.user.id;
     story.save(function(err) {
      UserModel.update({'_id': req.user.id}, {$push: {story: story}}, function(err, Story){
       if (err) {
         res.json({
           code: 400,
           message: "error"
         });
       } else {
         res.json({
           code: 200,
           message: "created",
           data: story
         });

       }
     })
   })
 }
   exports.getStoryById = function(req, res)
   {
   StoryModel.findOne({_id:req.params.id}).deepPopulate('comment comment.by name').exec(function(err, story)
   {
      if(err){
         res.json({code: 400, message: "Error occurred"});
       }
     else{
     res.json({code: 200, message: "records found",data:story});
         }
     })
   }
     exports.updateStory = function(req, res)
   {
       console.log("updatestory", req.params.id, req.body);
     //  BlogModel.findOneAndUpdate({_id: req.params.id}, { $set: req.body }, {new: true}, function(err, blog){

      StoryModel.update({_id: req.params.id}, { $set: req.body }, function(err, story)
      {
         if(err)
         {
           res.json({code: 404, message: err});
         }
          else
          {
            res.json({code: 200, data:story });
           }
       })
     }


   exports.removeStory = function(req, res) {
     console.log("removestory", req.params.id, req.body);
     StoryModel.remove({_id: req.params.id}, function(err, story) {
       if (err) {
         res.json({
           code: 400,
           message: "error"
         });

       } else {
         res.json({
           code: 200,
           message: "removed",
           data: story
         });

       }
     })
   }

   exports.approvedStory= function(req, res) {
     console.log(req.params,req.query)
      StoryModel.update({_id: req.params.id}, {$set: {isApproved: req.query.isapproved}}, function(err, Story){
       if (err) {
         res.json({
           code: 400,
           message: "error"
         });
       } else {
         res.json({
           code: 200,
           message: "created",
           data: Story
         });

       }
     })
   }
   
   exports.addComment = function(req, res){
     console.log(req.body);
     var comment = new CommentModel(req.body);
     comment.by=req.user.id;
     comment.save(function(err){
     console.log(err);
    StoryModel.update({_id: req.params.id}, {$push: {comment: comment}}, function(err, Story){
     if(err){ res.json({code: 404, message: err});
     }else{
             res.json({code: 200, data: Story });
           }
       })
     })
   }


  exports.uploadAvatar= function(req,res,next){
      var file = 'client/images/' + req.file.filename;
      fs.rename(req.file.path, file, function(err) {
        console.log(file)
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          console.log(file,"file")
          UserModel.update({'_id':req.user.id}, { $set: {userprofile:file} }, function(err, resp){
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              res.json({
                message: 'File uploaded successfully',
                filename: req.file.filename
              });
            }
          })
        }
      });
   }
