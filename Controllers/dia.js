const db = require('../Utils/database');
const date = require("date-and-time");

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

async function returnDia(data) {
    let dia = [];
    await db.execute(
        'SELECT * FROM Dia WHERE data = ?',
        [data]
    ).then(result => dia = result[0]);

    return dia;
}

const createDia = (async (req, res) => {
    try {
        let dia = await returnDia(req.body.data);
        if (dia[0] == undefined) {
            await db.execute(
                'INSERT INTO Dia (data, usuariMOD) VALUES(?, ?)',
                [req.body.data, req.body.usuariMOD]
            )
            res.status(201).json({ missatge: "Dia afegit" })
        } else {
            res.status(400).json({ missatge: "Aquest dia ja existeix" })
        }
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})


module.exports = {
    getDies,
    createDia,
    returnDies
}