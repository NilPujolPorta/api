const db = require('../Utils/database');

const createTreballador = (async (req, res) => {
    const nom = req.body.nom;
    const usuariMOD = req.body.usuariMOD;
    try {
        db.execute(
            "INSERT INTO Zona (nom, usuariMOD) VALUES (?, ?)",
            [nom, usuariMOD]
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