let express    = require("express");
let bodyParser = require("body-parser");
let cors       = require("cors");
let app        = express();

let auth       = require("./routes/auth.js");
let todo       = require("./routes/todo.js");

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '128kb'}))

app.use(cors());


app.use(auth);
app.use(todo);

app.get("/", function(req, res){
  res.send("you sent request")
})

app.get("*", function(req, res){
  res.send("404 not found")
})

app.listen(8080, function(){
  console.log("Server is running on http://localhost:8080/")
})
