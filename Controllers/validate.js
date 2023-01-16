
const bcrypt = require('bcrypt');
const User = require("../Model/Implementations/User/user.js");
const Token = require('../Model/Implementations/Token/token.js')
const jwt = require("jsonwebtoken")

const validateTokenG = (async (req,res,next) => {
    const token = new Token();
    const accessToken = req.headers["authorization"].split(" ")[1];
    if (accessToken == null) res.sendStatus(400).send("Token not present")
    jwt.verify(accessToken,token.secret, (err,user) => {
        if (err) res.status(403).send("Token invalid")
        else next();
    })
    console.log("Validate token")
    console.log(accessToken)
    
})


module.exports = {
    validateTokenG
}