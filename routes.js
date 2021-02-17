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
  if(req.body.name=="" || req.body.message==""){
    return res.send("Error, debes completar los campos");
  }
	let newMessage = await Message.create({    
    name: req.body.name,
    message: req.body.message
  });		
	res.redirect('/');
});


router.post("/comment",  async (req, res) => { 
  if(req.body.cname=="" || req.body.comment==""){
    return res.send("error");
  }

  let newComment = await Comment.create({    
    name: req.body.cname,
    comment: req.body.comment,
    MessageId: req.body.MessageId
  });   
  console.log(newComment);
  res.redirect('/');
});

router.get('/eliminar/:id', async (req,res) => {
  console.log("Eliminado");
  const eliminar = await Message.findByPk(req.params.id);
  await eliminar.destroy();
  res.redirect("/")
});


router.get('/eliminarC/:id', async (req,res) => {
  console.log("Eliminado");
  const eliminar = await Comment.findByPk(req.params.id);
  await eliminar.destroy();
  res.redirect("/")
});


module.exports = router;