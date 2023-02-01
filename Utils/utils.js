const { decode } = require("jsonwebtoken");
import jwt_decode from "jwt-decode";
import { getTreballadorByUsername } from "../Controllers/treballador";

const permisosBasics = ["user"];
function rolFromToken(token) {
    return getTreballadorByUsername(jwt_decode(token).user.usuari).rol;
}