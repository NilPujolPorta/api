const db = require('../Utils/database');

const getFestiusFixes = (async (req, res) => {
    let festius_fixes = [];
    await db.execute(
        'SELECT * FROM FestiusFixes'
    ).then(result => festius_fixes = result[0]);

    res.json(festius_fixes);
})

const createFestiuFixe = (async (req, res) => {
    await db.execute(
        'INSERT INTO FestiusFixes (data, usuariMOD) VALUES(?, ?)',
        [req.body.data, req.body.usuariMOD]
    )
    res.status(201).json({missatge: "Festiu fixe afegit"})
})


module.exports = {
    getFestiusFixes,
    createFestiuFixe
}