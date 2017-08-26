const mongoose = require('mongoose');

const config =require('../config/database');

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

//connect away
MongoClient.connect('mongodb://127.0.0.1:27017/nodeauth', function(err, db) {
  if (err) throw err;
  console.log("Connected to Database");
  //create collection
	db.createCollection("testCollection", function(err, collection){
	   if (err) throw err;

	   	console.log("Created testCollection");
	 		//console.log(collection);
	});
});    
const ContactSchema = mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

const Contact = module.exports = mongoose.model('Contact', ContactSchema, 'testCollection');