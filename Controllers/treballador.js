const db = require('../Utils/database');
const bcrypt = require('bcrypt');

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
        res.status(201).json({ message: 'Treballador registrat correctament' });
    } catch (error) {
        res.status(400).json({ message: error})
    }
})

async function encrypt(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}

const getTreballadors = (async (req, res) => {
    let resposta = [];
    await db.execute(
        'SELECT * FROM Treballador WHERE actiu = true'
    ).then(result => resposta = result[0]);
    res.status(200).json(resposta);
})


module.exports = {
    createTreballador,
    getTreballadors
}