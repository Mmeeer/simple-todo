var express = require('express')
var router = express.Router();
let auth = require("../controller/auth.js");

router.post("/signup", auth.signup)

router.post("/login", auth.login)

router.get("/mjolnir/:id/:token", auth.mjolnir)

// router.get("/")
// router.get("/asdfasdf", auth.checkToken, info.asdfasd);
module.exports = router;
