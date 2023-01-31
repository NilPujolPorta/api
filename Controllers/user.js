const bcrypt = require('bcrypt');
const User = require("../Model/Implementations/User/user.js");
const Token = require('../Model/Implementations/Token/token.js')
const jwt = require("jsonwebtoken")

const token = new Token();

const authenticated = (async (req, res) => {
    console.log(req.user)
    res.send(`${req.user.user} is valid`)
})


const validateToken = (async (req, res, next) => {

    const accessToken = req.headers["authorization"].split(" ")[1];
    if (accessToken == null) res.sendStatus(400).send("Token not present")
    jwt.verify(accessToken, token.secret, (err, user) => {
        if (err) res.status(403).send("Token invalid")
        else {
            req.user = user
            next();
        }
    })
    console.log("Validate token")
    console.log(accessToken)

})




module.exports = {
    authenticated,
    validateToken
}