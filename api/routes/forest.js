var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//Get data from mongoDB

var url = 'mongodb://localhost:27017/pinos';

router.get('/', function(req, res, next){
    //get mongo connection
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("Conected correctly to server");
        //get collection and res documents
        var col = db.collection('forestwatch');
        col.find({}).toArray(function(err, docs) {
            console.log("Found the following records");
            res.json({status: 200, data: docs}); 
            db.close();            
        });
    })
})

router.post('/form', (req, res, next) =>{
    //Check connection first
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("Ready to post");
        var col = db.collection('opinion');
        if(col.insertOne(req.body)){
            col.find({}).toArray(function(err, docs) {
                console.log("Found the following records");
                res.json({status: 200, response: docs}); 
                db.close();            
            });
        }
    });
})


module.exports = router;