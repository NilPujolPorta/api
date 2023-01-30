const bcrypt = require('bcrypt');
const User = require("../Model/Implementations/User/user.js");
const Token = require('../Model/Implementations/Token/token.js')
const jwt = require("jsonwebtoken")

const token = new Token();

const createUser = (async (req, res) => {
    const userEmail = req.body.email;
    const hashedPassword = await User.encrypt(req.body.password);
    const userName = req.body.name;
    const userSurname = req.body.surname;
    const userCategory = req.body.category;

    const userDetails = new User(userEmail, hashedPassword, userName, userSurname, userCategory);

    const result = await User.save(userDetails);

    res.status(201).json({ missatge: 'Usuari registrat correctament' });
})

const login = (async (req, res) => {
    let user;
    await User.login(req.body.email).then(result => user = result[0][0]);

    if (user == null || user == undefined) res.status(404).send("Usuari o contrasenya no vàlids");
    else {
        if (await bcrypt.compare(req.body.password, user.contrasenya)) {
            token.generateAccessToken(({ user: req.body.email }))
            token.generateRefreshToken({ user: req.body.email })
            console.log(token);
            res.json({ accessToken: token.accessToken, refreshToken: token.refreshToken })
        }
        else {
            res.status(401).send("Usuari o contrasenya no vàlids");
        }
    }
})

const refreshToken = (async (req, res) => {
    if (!token.refreshTokens.includes(req.body.token)) res.status(400).send("Refresh token invalid");

    token.eliminarRefreshToken(req.body.token);

    token.generateAccessToken(({ user: req.body.name }))
    token.generateRefreshToken({ user: req.body.name })

    res.json({ accessToken: token.accessToken, refreshToken: token.refreshToken })
})

const logout = (async (req, res) => {
    token.eliminarRefreshToken(req.body.token);
    res.status(204).send("Logged out!")
})

const authenticated = (async (req, res) => {
    console.log(req.user)
    res.send(`${req.user.user} is valid`)
})



const getUsers = (async (req, res) => {
    res.status(201).send({ "state": "OK" });
    console.log("Working!");
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

const createGuardies = (async (req, res) => {
    let plantilles = Array();
    await User.getPlantilles(req.body.email).then(result => plantilles = result[0]);
    try {
        plantilles.forEach(plantilla => {
        User.createGuardies(plantilla);
        })
    } catch (error) {
        res.status(400).send("Error en la creació de guàrdies: " + error);
    }
    res.status(201).json({ message: "Guàrdies creades correctament" });

})


module.exports = {
    createUser,
    getUsers,
    login,
    refreshToken,
    logout,
    authenticated,
    validateToken,
    createGuardies
}