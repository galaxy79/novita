'use strict';
var express = require('express');
var router = express.Router();
const assert = require("assert");
var mongodb = require('../utils/mongo.js');
const logger = require('../utils/logger.js');

const MongoClient = require("mongodb").MongoClient;
const { url } = mongodb;



/* GET hospital details based on search. */
router.get('/hospitaldetails', function (req, res) {
    console.log("Get hospital details ");
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        assert.ok(db !== null);
    //logger.log('info', "Success");
    //var query = { "name": req.params.country };
    db.collection("hospitalDetails").find({}).toArray(function (err, result) {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({
                message: 'Error connecting to the database'
            });
        }
        else {
           // console.log(result);
            res.status(200);
            res.json(result);
            db.close();
        }
    });

});
});


router.get('/hospitaldetails/:treatmentname', function (req, res) {
    console.log("Get hospital details based on treatment name ");
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        assert.ok(db !== null);
        //logger.log('info', "Success");
        var query = { "treatment.name": "Dental" };
        console.log(query);
        db.collection("hospitalDetails").find({query}).toArray(function (err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({
                    message: 'Error connecting to the database'
                });
            }
            else {
                // console.log(result);
                res.status(200);
                res.json(result);
                db.close();
            }
        });

    });
});

module.exports = router;