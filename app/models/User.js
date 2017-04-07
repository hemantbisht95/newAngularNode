var mongoose = require('mongoose');
// var mongoosePages = require('mongoose-pages');
var StoryModel = require("./story");
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var Userschema = new Schema
({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    created: { type: Date, default: Date.now },
    story:[{
      type:ObjectId,
      ref:"story"}],
    isAdmin:{
        type:Boolean,
        default:false
      },
    userprofile:String

});



var User = mongoose.model('User', Userschema);
module.exports=User;
