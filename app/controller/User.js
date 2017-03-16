var UserModel = require("./../models/User");
var jsonwebtoken = require('jsonwebtoken');


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
res.json({code:450,message:"awd"});

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
    var User = new UserModel(req.body);
    User.save(function (err){
      if (err){
              res.json({code:400,message:"error"});
              }else{
                   res.json({code:200,message:"created",data:User});
              }
        })
  }

exports.logUser = function(req, res){
    UserModel.findOne({email:req.body.email, password:req.body.password}).exec(function(err ,User)
     {
       if(err){
       console.log(error)
       res.json({code:400,message:"error"});
       }else if(User){
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
             data :{token: token }});
             }else{
                  res.json({code:404,message:"email or passwod is wrong"});
            }
      });
  }

  exports.getuserProfile = function(req, res){

    UserModel.findOne({'_id':req.user.id}).exec(function(err, user)
      {
         if(user){
                res.json({code: 200, message: "records found",data:user});
                }else{
                   res.json({code: 400, message: "Error occurred"});
               }
         });
    }
