const jwt_decode = require("jwt-decode");
const treballador = require("../Controllers/treballador.js")
const Token = require('../Model/Implementations/Token/token.js')
const jwt = require("jsonwebtoken")
const {token} = require("../Controllers/treballador.js")

const permisosBasics = ["user"];
function userFromToken(token) {
    return treballador.getTreballadorByUsername(jwt_decode(token).user.usuari);
}
const validateTokenG = (async (req, res, next) => {
    try {
        const accessToken = req.headers["authorization"].split(" ")[1];
        if (accessToken == null) res.sendStatus(400).send("Token not present")
        if (token.refreshTokens.includes(accessToken)) {
            res.status(400).json({ missatge: "Token invalid" })
            return
        }
        jwt.verify(accessToken, token.secret, (err, user) => {
            if (err){
                res.status(403).send("Token invalid") 
                return
            } 
            else{
                next();
            } 
        })
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})

module.exports = {
    validateTokenG,
    userFromToken
}