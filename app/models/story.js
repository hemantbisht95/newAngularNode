var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommentModel = require("./comments");
ObjectId = Schema.ObjectId;


var StorySchema = new Schema({
    title: String,
    category: String,
    content:String,
    comment:[{
      type:ObjectId,
      ref:"comment"}]
});

var Story = mongoose.model('story', StorySchema)
module.exports = Story;
