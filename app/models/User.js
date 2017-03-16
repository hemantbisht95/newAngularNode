
var mongoose = require('mongoose');
// var mongoosePages = require('mongoose-pages');
var CommentModel = require("./comments");
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
var Userschema = new Schema
({
    firstname:String,
    lastname:String,
    email:String,
    password:String


});
// mongoosePages.skip(Userschema);
var User = mongoose.model('User', Userschema);
module.exports=User;
