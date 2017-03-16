var StoryModel = require("./../models/story");
var CommentModel = require("./../models/comments");
    exports.getStory = function(req, res)
    {
    StoryModel.find({}).sort('-created').populate("comments").exec(function(err, story)
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
      story.save(function(err) {
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
    }
    exports.getStoryById = function(req, res)
    {

    StoryModel.find({_id:req.params.id}).populate("comments").exec(function(err, story)
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
          StoryModel.remove({
            _id: req.params.id
          }, function(err, story) {
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

        exports.addComment = function(req, res){
          var comment = new CommentModel(req.body);
          comment.save(function(err){
          StoryModel.update({_id: req.params.id}, { $push: {comments: comment} }, function(err, Story){
          if(err){ res.json({code: 404, message: err});
          }else{
                  res.json({code: 200, data: Story });
                }
            })
          })
        }
