let MongoClient = require("mongodb").MongoClient;
let ObjectId    = require("mongodb").ObjectId;
let jwt         = require("jsonwebtoken");

let db;

MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true }, function(err, client){
  db = client.db("codetodo");
})

module.exports.login = function(req, res){
  db.collection("user").findOne({email: req.body.email}, function(err, foundOne){
    if(err) res.json({success: false, data: {message: "Server error mongodb!!!"}})
    if(!foundOne) res.json({success: false, data: {message: "Email or password is wrong"}})
    if(foundOne.password == req.body.password){
      let token = jwt.sign({
        email: foundOne.email,
        password: foundOne.password,
        _id: foundOne._id
      }, "codefluencer")
      res.json({success: true, data: { token: token, _id: foundOne._id}})
    } else res.json({success: false, data: {message: "Email or password is wrong"}})
  })
}
module.exports.signup = function(req, res){
  console.log(req.body)
  let now = new Date();
  let data = {email: req.body.email, password: req.body.password, firstname: req.body.firstname, lastname: req.body.lastname, createdat: now};
  db.collection("user").findOne({email: req.body.email}, function(err, foundOne){
    if(err) res.json({success: false, data: {message: "Server error mongodb!!!"}})
    if(!foundOne){
      db.collection("user").insertOne(data, function(err, insertedOne){
        if(err) res.json({success: false, data: {message: "Server error mongodb!!!"}})
        res.json({success: true})
      })
    } else res.json({success: false, data: {message: "Email is already in use!!!"}})
  })
}

module.exports.mjolnir = function(req, res){
  if(req.params.token){
    jwt.verify(req.params.token, "codefluencer", function(err, decoded){
      if(err) res.json({success: false})
      if(decoded._id == req.params.id){
        console.log("You are worthed")
        res.json({success: true})
      }
      else res.json({success: false})
    })
  } else res.json({success: false})
}

module.exports.checkToken = function(req, res, next){
  if(req.headers.authorization){
    jwt.verify(req.headers.authorization, "codefluencer", function(err, decoded){
      if(err) res.json({success: false})
      else if(decoded) next();
      else res.json({success: false})
    })
  } else res.json({success: false})
}
