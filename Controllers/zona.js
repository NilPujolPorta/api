const db = require('../Utils/database');

const createZona = (async (req, res) => {
    const nom = req.body.nom;
    const usuariMOD = req.body.usuariMOD;
    db.execute(
        "INSERT INTO Zona (nom, usuariMOD) VALUES (?, ?)",
        [nom, usuariMOD]
    )

    res.status(201).json({ missatge: 'Zona registrada correctament' });
})

const getZones = (async (req, res) => {
    let resposta = [];
    await db.execute(
        'SELECT * FROM Zona'
    ).then(result => resposta = result[0]);
    res.status(200).json(resposta);
})


module.exports = {
    createZona,
    getZones
}