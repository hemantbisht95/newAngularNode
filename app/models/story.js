var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommentModel = require("./comments");
var UserModel = require("./User");
ObjectId = Schema.ObjectId;


var StorySchema = new Schema({
    title: String,
    category: String,
    content:String,
    date:{
       type: Date,
       default: Date.now
     },
    name:{
      type:ObjectId,
      ref:"User"
    },
    comment:[{
      type:ObjectId,
      ref:"comment"}],
      isApproved:{
          type:Boolean,
          default:false
        },
    likes:String

});



var deepPopulate = require('mongoose-deep-populate')(mongoose);
StorySchema.plugin(deepPopulate, {
  whitelist: [
    'name',
    'comment',
    'comment.by'
  ]
});
Story = mongoose.model('story', StorySchema)
module.exports = Story;
