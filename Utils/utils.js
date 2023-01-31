const { decode } = require("jsonwebtoken");

const permisosBasics = ["user"];
function rolFromToken(token) {
    return JSON.parse(jwt_decode(token)).rol;
}