const db = require('../Utils/database');
const festiusFixesController = require('../Controllers/festiusFixes.js');
const diaController = require('../Controllers/dia.js');
const plantillaController = require('../Controllers/plantilles.js');
const date = require("date-and-time");

const getGuardies = (async (req, res) => {
    let guardies = await returnGuardies();

    res.json(guardies);
})

async function returnGuardies() {
    let guardies = [];
    await db.execute(
        'SELECT * FROM Guardia WHERE actiu = true'
    ).then(result => guardies = result[0]);

    return guardies;
}

async function returnGuardia(places, torn, zona, categoria, data) {
    let guardia = [];
    await db.execute(
        'SELECT * FROM Guardia WHERE places = ? AND torn = ? AND zona = ? AND categoria = ? AND data = ? AND actiu = true',
        [places, torn, zona, categoria, data]
    ).then(result => guardia = result[0]);

    return guardia;
}

const createGuardia = (async (req, res) => {
    try {
        let guardia = await returnGuardia(req.body.places, req.body.torn, req.body.zona, req.body.categoria, req.body.data);
        if (guardia[0] == undefined) {
            await db.execute(
                "INSERT INTO Guardia (places, torn, zona, categoria, data, usuariMOD) VALUES (?, ?, ?, ?, ?, ?)",
                [req.body.places, req.body.torn, req.body.zona, req.body.categoria, req.body.data, req.body.usuariMOD]
            )
            res.status(201).json({ missatge: "Guardia afegida" })
        } else {
            res.status(400).json({ missatge: "Aquesta guardia ja existeix" })
        }
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})

const createGuardies = (async (req, res) => {
    try {
        let dies;
        let festius;
        dies = await diaController.returnDies();
        festius = await festiusFixesController.returnFestiusFixes();
        festius.forEach(async festiu => {
            let dia_festiu = await diaController.returnDia(festiu.data)
            if (dia_festiu[0] == undefined) {
                await diaController.crearDia(festiu.data, festiu.usuariMOD)
                dies.push(festiu);
            }
        });
        dies.forEach(dia => {
            crearGuardiesPerDia(dia);
        })
        res.status(201).json({ message: "Guàrdies creades" })
    } catch (error) {
        res.status(400).json({ message: error })
    }

})

async function crearGuardiesPerDia(dia) {
    try {
        let plantilles = await plantillaController.returnPlantilles();
        plantilles.forEach(async plantilla => {
            let guardia = await returnGuardia(plantilla["places"], plantilla["torn"], plantilla["zona"], plantilla["categoria"], date.format(dia["data"], "YYYY-MM-DD"));
            if (guardia[0] == undefined) {
                db.execute(
                    "INSERT INTO Guardia (places, torn, zona, categoria, data, usuariMOD) VALUES (?, ?, ?, ?, ?, ?)",
                    [plantilla["places"], plantilla["torn"], plantilla["zona"], plantilla["categoria"], date.format(dia["data"], "YYYY-MM-DD"), "admin"]
                )
            }
        });
    } catch (error) {
        res.status(400).json({ missatge: error })
    }

}

const deactivateGuardia = (async (req, res) => {
    try {
        await db.execute(
            'UPDATE Guardia SET actiu = false AND usuariMOD = ? WHERE idGuardia = ?',
            [req.body.usuariMOD, req.body.idGuardia]
        )
        res.status(201).json({ missatge: "Guardia desactivada" })
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})

const getGuardiesTreballador = (async (req, res) => {
    try {
        let guardies = []
        await db.execute(
            "SELECT Guardia.*, TreballadorsApuntats.estat FROM Guardia  INNER JOIN TreballadorsApuntats ON " +
            "(Guardia.idGuardia = TreballadorsApuntats.idGuardia AND TreballadorsApuntats.usuari = ? " +
            "AND (estat = 'apuntat' OR estat = 'triat') AND actiu = true)",
            [req.body.usuari]
        ).then(result => guardies = result[0])
        guardies.forEach(guardia => {
            guardia["data"] = date.format(guardia["data"], "DD-MM-YYYY")
        });
        res.status(201).json(guardies)
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})

module.exports = {
    getGuardies,
    createGuardia,
    createGuardies,
    deactivateGuardia,
    getGuardiesTreballador
}