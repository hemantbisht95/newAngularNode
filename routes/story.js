
var express = require('express');
var router = express.Router();
var StoryCtrl = require("./../app/controller/Story");


router.post('/:id/addComment', StoryCtrl.addComment);
router.get('/getStory', StoryCtrl.getStory);

router.get('/:id',StoryCtrl.getStoryById);
router.delete('/removeStory/:id',StoryCtrl.removeStory);
router.post('/addStory', StoryCtrl.addStory);
router.post('/updateStory/:id',StoryCtrl.updateStory);
module.exports = router;
