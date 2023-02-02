const db = require('../Utils/database');

const createTorn = (async (req, res) => {
    try {
        const nom = req.body.nom;
        const usuariMOD = req.body.usuariMOD;
        db.execute(
            "INSERT INTO Torn (nom, usuariMOD) VALUES (?, ?)",
            [nom, usuariMOD]
        )

        res.status(201).json({ missatge: 'Torn registrat correctament' });
    } catch (error) {
        res.status(400).json({ missatge: error })
    }

})

const getTorns = (async (req, res) => {
    try {
        let resposta = [];
        await db.execute(
            'SELECT * FROM Torn'
        ).then(result => resposta = result[0]);
        res.json(resposta);
    } catch (error) {
        res.status(400).json({ missatge: error })
    }

})


module.exports = {
    createTorn,
    getTorns
}