var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var CommentSchema = new Schema({
    postedby: String,
    content: String
});

var Comment = mongoose.model('comments', CommentSchema)
module.exports = Comment;
