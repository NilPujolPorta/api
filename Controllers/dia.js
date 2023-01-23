const db = require('../Utils/database');

const getDies = (async (req, res) => {
    let dies = [];
    dies = await returnDies()

    res.json(dies);
})

async function returnDies() {
    let dies = [];
    await db.execute(
        'SELECT * FROM Dia'
    ).then(result => dies = result[0]);

    return dies;
}

const createDia = (async (req, res) => {
    await db.execute(
        'INSERT INTO Dia (data, usuariMOD) VALUES(?, ?)',
        [req.body.data, req.body.usuariMOD]
    )
    res.status(201).json({ missatge: "Dia afegit" })
})


module.exports = {
    getDies,
    createDia,
    returnDies
}