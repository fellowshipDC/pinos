var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//Get data from mongoDB

var url = 'mongodb://localhost:27017/pinos';
var findDocuments = function(db, callback){
    //get collection
    var collection = db.collection('documents');
    //get documents
    collection.find().toArray(function(err, docs) {
        console.log("Found the following records");
        console.dir(docs);
        callback(docs);
    });
}

router.get('/', function(req, res, next){
    //get mongo connection
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("Conected correctly to server");
        //get collection and res documents
        var col = db.collection('forestwatch');
        col.find({}).limit(30).toArray(function(err, docs) {
            console.log("Found the following records");
            console.dir(docs);
            db.close();
            res.json({status: 200, data: docs});            
        });
    })
})

router.get('/country/mt2', function(req, res, next){
    //get mongo conection
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log('Conected correctly to server');
        //find only country level data
        var col = db.collection('forestwatch');
        col.find({indicator_id: 14, sub_nat_id: null, boundary_id: 1, thresh: 10}).toArray(function(err, docs){
            console.log('Found records');
            console.dir(docs);
            db.close();
            res.json({status: 200, data: docs})
        })


    })
})


module.exports = router;