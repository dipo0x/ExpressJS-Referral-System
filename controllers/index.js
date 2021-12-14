const postData = require('../models/post')
const createError = require('http-errors');
const {edit_post} = require('../utils/validators')

exports.homepage = function(req, res) {
  postData.find({available:true}, (err, post)=>{
    res.render('index', {post:post});
  })
};

exports.get_add_post  = function(req, res, next) {
  res.render('index/add-edit');
}

exports.add_post  = function(req, res, next) {
  const title = req.body.title
  const content = req.body.content
  const owner = req.user
  const available = true
  const date = new Date().toTimeString().split(" ")[0];
  const likes = 0
  const users = ''

  const { errors, valid } = edit_post(title, post)
  if(!valid){
    rerender_add_edit_post(theErrors, errors, req, res, next);
  }
  let newPost = new postData({
    title: title,
    content: content,
    owner: owner,
    available: available,
    date: date,
    likes: likes,
    users: users,
  })
  newPost.save().then(aftermaths=>{
    postData.findOne({owner : owner, date:date}).then(post=>{
      res.redirect('/read-post/'+post.id)
        
    })  
  })
}

exports.details = function(req, res){
  postData.findById(req.params.id,(err, details)=>{
    res.render('index/details', {post:details}
    )
  })}

exports.delete = function(req, res){
  postData.findById(req.params.id,(err, details)=>{
    if (req.user.id === post.user.id){
      lead.deleteOne().then(result=>{
        res.redirect('/profile')
        })
      }
    else{
      return createError("404", "This page doesnt exist daddy wa") 
      }
    }
)}

exports.get_edit = function(req, res){
  postData.findById(req.params.id,(err, post)=>{
    if (req.user.id === post.user.id){
        res.render('/edit', {post:post})
        }
    else{
      return createError("404", "This page doesnt exist daddy wa") 
      }
    }
)}

exports.edit = function(req, res){
  postData.findById(req.params.id,(err, post)=>{
    if (req.user.id === post.user.id){
      post.update(req.body).then(result=>{
        res.redirect('/details' + post.id)
        })
      }
    else{
      return createError("404", "This page doesnt exist daddy wa") 
      }
    }
)}

exports.archive = function(req, res){
  postData.findById(req.params.id,(err, post)=>{
    if (req.user.id === post.user.id){
      post.updateOne({
        available:false
      }).then(result=>{
        res.redirect('/profile')
        })
      }
    else{
      return createError("404", "This page doesnt exist daddy wa") 
      }
    }
)}