const db = require('../Utils/database');

const createTreballador = (async (req, res) => {
    const usuari = req.body.nom;
    const contrasenya = req.body.contasenya;
    const usuariMOD = req.body.usuariMOD;
    const nom = req.body.nom;
    const cognoms = req.body.cognoms;
    const categoria = req.body.categoria;
    try {
        db.execute(
            "INSERT INTO Zona (usuari, contasenya, usuariMOD, nom, conoms, categoria) VALUES (?, ?)",
            [usuari, contrasenya, usuariMOD, nom, cognoms, categoria]
        )
        res.status(201).json({ message: 'Zona registrada correctament' });
    } catch (error) {
        res.status(400).json({ message: 'Error en registrar la zona' })
    }
})

const getTreballadors = (async (req, res) => {
    let resposta = [];
    await db.execute(
        'SELECT * FROM Treballador'
    ).then(result => resposta = result[0]);
    res.status(200).json(resposta);
})


module.exports = {
    createTreballador,
    getTreballadors
}