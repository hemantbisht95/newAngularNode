var mongoose = require("mongoose");
var UserModel = require("./User");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
  Comment: String,
  by:{
    type:ObjectId,
    ref:"User"
  }
});

var comment = mongoose.model('comment', CommentSchema)
module.exports = comment;
