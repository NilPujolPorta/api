const db = require('../Utils/database');
const bcrypt = require('bcrypt');
const User = require("../Model/Implementations/User/user.js");
const Token = require('../Model/Implementations/Token/token.js');
const jwt = require("jsonwebtoken");

const token = new Token();

const createTreballador = (async (req, res) => {
    const usuari = req.body.usuari;
    const contrasenya = await encrypt(req.body.contrasenya);
    const usuariMOD = req.body.usuariMOD;
    const nom = req.body.nom;
    const cognoms = req.body.cognoms;
    const categoria = req.body.categoria;
    const rol = req.body.rol;
    try {
        db.execute(
            "INSERT INTO Treballador (usuari, contrasenya, usuariMOD, nom, cognoms, categoria, rol) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [usuari, contrasenya, usuariMOD, nom, cognoms, categoria, rol]
        )
        res.status(201).json({ missatge: 'Treballador registrat correctament' });
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})

async function encrypt(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
}

const getTreballadors = (async (req, res) => {
    let resposta = [];
    await db.execute(
        'SELECT * FROM Treballador WHERE actiu = true'
    ).then(result => resposta = result[0]);
    res.status(200).json(resposta);
})

async function getTreballadorByUsername(username) {
    return await db.execute(
        'SELECT * FROM Treballador WHERE actiu = true AND usuari = \'' + username + '\''
    ).then(result => resposta = result[0]);
}

const login = (async (req, res) => {
    let user;
    await getTreballadorByUsername(req.body.usuari).then(result => user = result[0]);
    console.log(user);
    if (user == null || user == undefined) res.status(404).send("Usuari o contrasenya no vàlids");
    else {
        if (bcrypt.compare(req.body.contrasenya, user.contrasenya)) {
            console.log
            token.generateAccessToken(({ user: user }))
            token.generateRefreshToken({ user: user })
            console.log(token);
            res.json({ accessToken: token.accessToken, refreshToken: token.refreshToken })
        }
        else {
            res.status(401).send("Usuari o contrasenya no vàlids");
        }
    }
})

const logout = (async (req, res) => {
    token.eliminarRefreshToken(req.body.token);
    res.status(204).send("Logged out!")
})

module.exports = {
    createTreballador,
    getTreballadors,
    login,
    logout
}