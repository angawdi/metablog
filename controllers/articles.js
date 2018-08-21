var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
  res.render('articles/index');
});

router.get('/new', function(req, res){
 	db.author.findAll().then(function(allAuthors){
 		res.render('articles/new', {authors: allAuthors});
 	}).catch(function(err){
 		console.log(err);
 		res.send('oops');
 	});
});

router.get('/:id', function(req, res){
	db.article.findOne({
		where: {id: req.params.id},
		include: [db.author]
	}).then(function(foundArticle){
		res.render('articles/show', {article: foundArticle});
	}).catch(function(err){
		console.log(err);
		res.send('oops');
	});
});

router.post('/', function(req, res){
	console.log(req.body);
  db.article.create(req.body).then(function(createArticle){
  	res.redirect('/articles/' + createArticle.id);
  }).catch(function(err){
  	console.log(err);
  	res.send('Nooooo');
  });
});

module.exports = router;
