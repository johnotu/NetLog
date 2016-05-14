var express = require('express');
var router = express.Router();

//GET log
router.get('/loglist', function(req, res){
	var db = req.db;
	var collection = db.get('loglist');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});

//POST log
router.post('/addlog', function(req, res){
	var db = req.db;
	var collection = db.get('loglist');
	collection.insert(req.body, function(err, result){
		res.send(
			(err === null) ? {msg:''} : {msg: err}
			);
	});
});

module.exports = router;