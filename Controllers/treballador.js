const db = require('../Utils/database');
const bcrypt = require('bcrypt');
const Token = require('../Model/Implementations/Token/token.js');
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

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

const getTreballador = (async (req, res) => {
    let resposta = [];
    await getTreballadorByUsername(req.body.usuari).then(result => resposta = result[0]);
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
    if (user == null || user == undefined) res.status(400).send("Usuari o contrasenya no vàlids");
    else {
        bcrypt.compare(req.body.contrasenya, user.contrasenya, function (err, result) {
            if (result == true) {
                token.generateAccessToken(({ user: user }))
                token.generateRefreshToken({ user: user })
                res.json({ accessToken: token.accessToken, refreshToken: token.refreshToken })
            } else {
                res.status(401).send("Usuari o contrasenya no vàlids: " + err);
            }
        });

    }
})

const logout = (async (req, res) => {
    token.eliminarRefreshToken(req.body.token);
    res.status(204).send("Logged out!")
})

const refreshToken = (async (req, res) => {
    const refreshToken = req.headers["authorization"].split(" ")[1];
    console.log(JSON.stringify(jwt_decode(refreshToken)));
    if (!token.refreshTokens.includes(refreshToken)) res.status(400).send("Refresh token invalid")
    else {
        jwt.verify(refreshToken, token.secret, (err, user) => {
            if (err) res.status(403).send("Token invalid")
            else {
                token.eliminarRefreshToken(refreshToken);
                console.log(jwt_decode(refreshToken)['user']['usuari']);
                token.generateAccessToken({ user: jwt_decode(refreshToken)['user'] })
                token.generateRefreshToken({ user: jwt_decode(refreshToken)['user'] })

                console.log(JSON.stringify(user));
                res.json({ accessToken: token.accessToken, refreshToken: token.refreshToken })
            }
        })
    }
})

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
    createTreballador,
    getTreballadors,
    login,
    logout,
    getTreballador,
    refreshToken,
    validateToken,
    authenticated,
    getTreballadorByUsername
}