var mongoose = require("mongoose");
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;


var StorySchema = new Schema({
    title: String,
    category: String,
    content:String,
    comments:[{
      type:ObjectId,
      ref:"comments"}]
});

var Story = mongoose.model('story', StorySchema)
module.exports = Story;
