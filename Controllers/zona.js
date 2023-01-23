const db = require('../Utils/database');

const createZona = (async (req, res) => {
    const nom = req.body.nom;
    const actiu = req.body.actiu;
    const usuariMOD = req.body.usuariMOD;
    db.execute(
        "INSERT INTO Zona (nom, actiu, usuariMOD) VALUES (?, ?, ?)",
        [nom, actiu, usuariMOD]
    )

    res.status(201).json({ message: 'Zona registrada correctament' });
})

const getZones = (async (req, res) => {
    let resposta = [];
    await db.execute(
        'SELECT * FROM Zona'
    ).then(result => resposta = result[0]);
    res.json(resposta);
})


module.exports = {
    createZona,
    getZones
}