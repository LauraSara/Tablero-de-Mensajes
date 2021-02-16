const { name } = require('ejs');
const { Router } = require('express');
const { Message, Comment } = require('./db');
const router = Router();

router.get('/', async (req, res) => {  
  const messages = await Message.findAll({
    include: [Comment]
  });

  const comments = await Comment.findAll({
    include: [Message]
  });

  console.log(messages);
  res.render('index.ejs', {messages: messages, comments: comments})
});

router.post("/message",  async (req, res) => { 
	let newMessage = await Message.create({    
    name: req.body.name,
    message: req.body.message
  });		
	res.redirect('/');
});



router.post("/comment",  async (req, res) => { 
  let newComment = await Comment.create({
    
    name: req.body.cname,
    comment: req.body.comment,
    MessageId: req.body.MessageId
  });   
  console.log(newComment);
  res.redirect('/');
});


//yaaaaa

//router.post("/comment/:message._id",  async (req, res) => { 







module.exports = router;