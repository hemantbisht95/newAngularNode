var express = require('express');
var UserModel = require("./../app/models/User");
var router = express.Router();
var UserCtrl = require("./../app/controller/User");
var StoryCtrl = require("./../app/controller/User");
var path = require('path');
var fs = require('fs');
var multer  = require('multer')
var crypto =require('crypto')

/* step-4 parse token using passport and set as req.user */
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var jsonwebtoken = require('jsonwebtoken');
passport.use(new Strategy(
  function(token, callback) {
      console.log("token",token);
      try {
        jsonwebtoken.verify(token, 'shhhhh', function(err, decoded) {
          if (err) {
            // console.log("err",err);
            callback('Invalid token');
          } else {
            console.log("decoded",decoded)
            UserModel.findOne({'_id':decoded.id}).exec(function(err, user)
              {
                 if(user){
                   callback(false, user);
                     } else {
                       console.log("err2",err)
                           callback('Invalid token');
                   }
              });
            }
        });
      } catch (e) {
        callback('Invalid token');
      }
}));

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname))
    })
  }
})
var upload = multer({ storage: storage })

// router.post('/uploadAvatar',upload.single('file'),function(req,res,next){
//   var file = 'client/images/' + req.file.filename;
//    fs.rename(req.file.path, file, function(err) {
//      if (err) {
//        console.log(err);
//        res.sendStatus(500);
//      } else {
//        res.json({
//          message: 'File uploaded successfully',
//          filename: req.file.filename
//        });
//      }
//    });
// });

router.post('/uploadAvatar',passport.authenticate('bearer', { session: false }),upload.single('file'),UserCtrl.uploadAvatar);
router.get('/getcmnt',passport.authenticate('bearer', { session: false }),UserCtrl.getUserComment);
router.get('/getUser',passport.authenticate('bearer', { session: false }),UserCtrl.getUser);
router.post('/postComment/:id',UserCtrl.postComment);

router.get('/userprofile',passport.authenticate('bearer', { session: false }),UserCtrl.getuserProfile);

router.get('/',passport.authenticate('bearer', { session: false }),UserCtrl.getUserById);
router.delete('/removeUser/:id',UserCtrl.removeUser);
router.post('/addUser', UserCtrl.addUser);
router.post('/updateUser',passport.authenticate('bearer', { session: false }),UserCtrl.updateUser);
router.post('/register',UserCtrl.regUser);
router.post('/login',UserCtrl.logUser);
router.get('/auth',UserCtrl.auth);

router.post('/addComment/:id',passport.authenticate('bearer', { session: false }), StoryCtrl.addComment);
router.get('/getStory', StoryCtrl.getStory);

// router.get('/getloveStory', StoryCtrl.loveStoryStory);
router.get('/:id',StoryCtrl.getStoryById);
router.delete('/removeStory/:id',StoryCtrl.removeStory);
router.get('/approvedStory/:id',StoryCtrl.approvedStory);
router.post('/addStory', passport.authenticate('bearer', { session: false }),StoryCtrl.addStory);
router.post('/updateStory/:id',StoryCtrl.updateStory);
module.exports = router;

module.exports = router;

