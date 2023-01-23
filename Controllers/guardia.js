const db = require('../Utils/database');
const festiusFixesController = require('../Controllers/festiusFixes.js');
const diaController = require('../Controllers/dia.js');
const plantillaController = require('../Controllers/plantilles.js');
const date = require("date-and-time");

const getGuardies = (async (req, res) => {
    let categories = [];
    await db.execute(
        'SELECT * FROM Guardia'
    ).then(result => categories = result[0]);

    res.json(categories);
})

const createGuardia = (async (req, res) => {
    await db.execute(
        "INSERT INTO Guardia (places, torn, zona, categoria, data, usuariMOD) VALUES (?, ?, ?, ?, ?, ?)",
        [req.body.places, req.body.torn, req.body.zona, req.body.categoria, req.body.data, req.body.usuariMOD]
    )
    res.status(201).json({ missatge: "Guardia afegida" })
})

const createGuardies = (async (req, res) => {
    let dies;
    dies = await diaController.returnDies();
    dies.forEach(dia => {
         crearGuardiesPerDia(dia);
    })
    res.status(201).json({ message: "Guàrdies creades" })
})

async function crearGuardiesPerDia(dia) {
    let plantilles = await plantillaController.returnDies();
    plantilles = plantilles[0];
    plantilles.forEach(plantilla => {
        db.execute(
            "INSERT INTO Guardia (places, torn, zona, categoria, data, usuariMOD) VALUES (?, ?, ?, ?, ?, ?)",
            [plantilla["places"], plantilla["torn"], plantilla["zona"], plantilla["categoria"], date.format(dia["data"], "YYYY-MM-DD"), "admin"]
        )
    });
}

module.exports = {
    getGuardies,
    createGuardia,
    createGuardies
}