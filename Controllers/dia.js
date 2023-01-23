const db = require('../Utils/database');

const getDies = (async (req, res) => {
    let categories = [];
    await db.execute(
        'SELECT * FROM Dia'
    ).then(result => categories = result[0]);

    res.json(categories);
})

const createDia = (async (req, res) => {
    await db.execute(
        'INSERT INTO Dia (data, usuariMOD) VALUES(?, ?)',
        [req.body.data, req.body.usuariMOD]
    )
    res.status(201).json({missatge: "Dia afegit"})
})


module.exports = {
    getDies,
    createDia
}