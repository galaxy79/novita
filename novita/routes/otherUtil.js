'use strict';
var express = require('express');
var router = express.Router();
const assert = require("assert");
var mongodb = require('../utils/mongo.js');
const logger = require('../utils/logger.js');

const MongoClient = require("mongodb").MongoClient;
const { url } = mongodb;

//var isd = null;

/* GET api to get the country and ISD codes */
router.get('/countryisdmapping', function (req, res) {
    console.log("Get isd country mapping");
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        assert.ok(db !== null);
        //logger.log('info', "Success");
        var query = { "name": req.params.country };
        db.collection("countryIsdmapping").find({}).toArray(function (err, result) {
            if (err)
            {
                console.log(err);
                res.status(500);
                res.json({
                    message: 'Error connecting to the database'});
                }
            else{
                // console.log(result);
                 res.status(200);
                res.json(result);
                
                 db.close();
                }
        });
        
    });
    
});



module.exports = router;