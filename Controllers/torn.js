const db = require('../Utils/database');

const createTorn = (async (req, res) => {
    const nom = req.body.nom;
    const usuariMOD = req.body.usuariMOD;
    db.execute(
        "INSERT INTO Torn (nom, usuariMOD) VALUES (?, ?)",
        [nom, usuariMOD]
    )

    res.status(201).json({ message: 'Torn registrat correctament' });
})

const getTorns = (async (req, res) => {
    let resposta = [];
    await db.execute(
        'SELECT * FROM Torn'
    ).then(result => resposta = result[0]);
    res.json(resposta);
})


module.exports = {
    createTorn,
    getTorns
}