const db = require('../Utils/database');

const getFestiusFixes = (async (req, res) => {
    let festius_fixes = [];
    await db.execute(
        'SELECT * FROM FestiusFixes'
    ).then(result => festius_fixes = result[0]);

    res.json(festius_fixes);
})

async function returnFestiuFixe(data) {
    let festiu = [];
    await db.execute(
        'SELECT * FROM FestiusFixes WHERE data = ?',
        [data]
    ).then(result => festiu = result[0]);

    return festiu;
}

const createFestiuFixe = (async (req, res) => {
    try {
        let festiu = await returnFestiuFixe(req.body.data);
        if (festiu[0] == undefined) {

            await db.execute(
                'INSERT INTO FestiusFixes (data, usuariMOD) VALUES(?, ?)',
                [req.body.data, req.body.usuariMOD]
            )
            res.status(201).json({ missatge: "Festiu afegit" })

        } else {
            res.status(400).json({ missatge: "Aquest festiu ja existeix" })
        }
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})


module.exports = {
    getFestiusFixes,
    createFestiuFixe
}