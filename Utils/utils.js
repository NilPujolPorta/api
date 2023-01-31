const { decode } = require("jsonwebtoken");
import jwt_decode from "jwt-decode";

const permisosBasics = ["user"];
function rolFromToken(token) {
    return JSON.parse(jwt_decode(token)).rol;
}