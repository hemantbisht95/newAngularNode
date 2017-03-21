var express = require('express');
var router = express.Router();
var UserCtrl = require("./../app/controller/User");
var StoryCtrl = require("./../app/controller/User");
/* step-4 parse token using passport and set as req.user */
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var jsonwebtoken = require('jsonwebtoken');
passport.use(new Strategy(
  function(token, callback) {
    jsonwebtoken.verify(token, 'shhhhh', function(err, decoded) {
      if (err) {
        console.log(err);
        callback('Invalid token');
      } else {
          console.log(decoded)
          callback(false, decoded);
        }
    });
}));


router.get('/getUserComment/:id',passport.authenticate('bearer', { session: false }),UserCtrl.getUserComment
);
router.get('/getUser',passport.authenticate('bearer', { session: false }),UserCtrl.getUser);
router.post('/postComment',passport.authenticate('bearer', { session: false }),UserCtrl.postComment);

router.get('/userprofile',passport.authenticate('bearer', { session: false }),UserCtrl.getuserProfile);

router.get('/',passport.authenticate('bearer', { session: false }),UserCtrl.getUserById);
router.delete('/removeUser/:id',UserCtrl.removeUser);
router.post('/addUser', UserCtrl.addUser);
router.post('/updateUser',passport.authenticate('bearer', { session: false }),UserCtrl.updateUser);
router.post('/register',UserCtrl.regUser);
router.post('/login',UserCtrl.logUser);
router.get('/auth',passport.authenticate('bearer', { session: false }),UserCtrl.auth);

router.post('/addComment/:id', StoryCtrl.addComment);
router.get('/getStory', StoryCtrl.getStory);

router.get('/:id',StoryCtrl.getStoryById);
router.delete('/removeStory/:id',StoryCtrl.removeStory);
router.post('/addStory', passport.authenticate('bearer', { session: false }),StoryCtrl.addStory);
router.post('/updateStory/:id',StoryCtrl.updateStory);
module.exports = router;

module.exports = router;
