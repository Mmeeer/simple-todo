let MongoClient = require("mongodb").MongoClient;
let ObjectId    = require("mongodb").ObjectId;
let jwt         = require("jsonwebtoken");

let db;

MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true }, function(err, client){
  db = client.db("codetodo");
})

module.exports.gettodo = async function(req, res){
  jwt.verify(req.headers.authorization, "codefluencer", function(err, decoded){
    db.collection("todo").find({user: ObjectId(decoded._id)}).toArray(function(err, array){
      res.json({todo: array})
    })
  })
}

module.exports.settodo = async function(req, res){
  jwt.verify(req.headers.authorization, "codefluencer", function(err, decoded){
    db.collection("todo").insertOne({user: ObjectId(decoded._id), title: req.body.title, list: req.body.list}, function(err, array){
      res.json({success: true, message: "Successfully saved"});
    })
  })
}

module.exports.checktodo = async function(req, res){
  jwt.verify(req.headers.authorization, "codefluencer", function(err, decoded){
    db.collection("todo").findOne({_id: ObjectId(req.body.id)}, function(err, todo){
      if(err) res.json({success: false, message: "Database error"})
      todo.list[req.body.index].checked = req.body.status;
      db.collection("todo").updateOne({_id: ObjectId(req.body.id)}, {$set: todo}, function(err, dbres){
        if(err) res.json({success: false, message: "Database error"})
        else res.json({success: true, message: "Successfully setup"})
      });
    })
  })
}
