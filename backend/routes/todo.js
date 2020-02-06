var express = require('express')
var router = express.Router();
let auth = require("../controller/auth.js");
let todo = require("../controller/todo.js");
router.get("/gettodo", auth.checkToken, todo.gettodo);

router.post("/settodo", auth.checkToken, todo.settodo);

router.post("/checktodo", auth.checkToken, todo.checktodo);

// router.get("/")
// router.get("/asdfasdf", auth.checkToken, info.asdfasd);
module.exports = router;
