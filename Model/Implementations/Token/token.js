const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

class Token {
    refreshTokens;
    refreshToken;
    accessToken;
    secret;

    constructor() {
        this.refreshTokens = new Array();
        this.secret = process.env.ACCESS_TOKEN_SECRET
    }

    generateAccessToken(user) {
        this.accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"}) 
    }

    generateRefreshToken(user) {
        this.refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
        this.refreshTokens.push(this.refreshToken);
    }

    eliminarRefreshToken(token) {
        this.refreshTokens = this.refreshTokens.filter( t => t != token);
    }
}

module.exports = Token;