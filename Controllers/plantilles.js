const db = require('../Utils/database');

const getPlantilles = (async (req, res) => {
    let plantilles = await returnPlantilles();

    res.json(plantilles);
})

async function returnPlantilles() {
    let plantilles = [];
    await db.execute(
        'SELECT * FROM Plantilles WHERE actiu = true'
    ).then(result => plantilles = result[0]);

    return plantilles;
}

async function returnPlantilla(places, torn, zona, categoria) {
    let plantilla = [];
    await db.execute(
        'SELECT * FROM Plantilles WHERE places = ? AND torn = ? AND zona = ? AND categoria = ? AND actiu = true',
        [places, torn, zona, categoria]
    ).then(result => plantilla = result[0]);

    return plantilla;
}

const createPlantilla = (async (req, res) => {
    try {
        let plantilla = await returnPlantilla(req.body.places, req.body.torn, req.body.zona, req.body.categoria);
        if (plantilla[0] == undefined) {
            await db.execute(
                'INSERT INTO Plantilles (places, torn, zona, categoria, usuariMOD) VALUES(?, ?, ?, ?, ?)',
                [req.body.places, req.body.torn, req.body.zona, req.body.categoria, req.body.usuariMOD]
            )
            res.status(201).json({ missatge: "Plantilla afegida" })
        } else {
            res.status(400).json({ missatge: "Aquesta plantilla ja existeix" })
        }
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})

const deactivatePlantilla = (async (req, res) => {
    try {
        await db.execute(
            'UPDATE Plantilles SET actiu = false AND usuariMOD = ? WHERE idPlantilla = ?',
            [req.body.usuariMOD, req.body.idPlantilla]
        )
        res.status(201).json({ missatge: "Plantilla desactivada" })
    } catch (error) {
        res.status(400).json({missatge: error})
    }
})


module.exports = {
    getPlantilles,
    returnPlantilles,
    createPlantilla,
    deactivatePlantilla
}