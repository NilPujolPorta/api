const db = require('../Utils/database');

const getFestiusFixes = (async (req, res) => {
    let festius_fixes = await returnFestiusFixes();

    res.json(festius_fixes);
})

async function returnFestiusFixes(){
    let festiu = [];
    await db.execute(
        'SELECT * FROM FestiusFixes'
    ).then(result => festiu = result[0]);

    return festiu;
}

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

const deactivateFestiuFixe = (async (req, res) => {
    try {
        await db.execute(
            'UPDATE FestiusFixes SET actiu = false AND usuariMOD = ? WHERE data = ?',
            [req.body.usuariMOD, req.body.data]
        )
        res.status(201).json({ missatge: "Festiu desactivat" })
    } catch (error) {
        res.status(400).json({missatge: error})
    }
})


module.exports = {
    getFestiusFixes,
    createFestiuFixe,
    deactivateFestiuFixe
}