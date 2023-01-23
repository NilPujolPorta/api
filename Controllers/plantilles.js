const db = require('../Utils/database');

const getPlantilles = (async (req, res) => {
    let plantilles = await returnPlantilles();

    res.json(plantilles);
})

async function returnPlantilles(){
    let plantilles = [];
    await db.execute(
        'SELECT * FROM Plantilles'
    ).then(result => plantilles = result[0]);

    return plantilles
}

const createPlantilla = (async (req, res) => {
    await db.execute(
        'INSERT INTO Plantilles (places, torn, zona, categoria, usuariMOD) VALUES(?, ?, ?, ?, ?)',
        [req.body.places, req.body.torn, req.body.zona, req.body.categoria, req.body.usuariMOD]
    )
    res.status(201).json({missatge: "Plantilla afegida"})
})


module.exports = {
    getPlantilles,
    returnPlantilles,
    createPlantilla
}