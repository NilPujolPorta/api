const db = require('../Utils/database');

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
    res.status(201).json({missatge: "Guardia afegida"})
})

const createGuardies = (async (req, res) => {
    let festius_fixes = Array();
    festius_fixes = await this.getFestiusFixes();
    festius_fixes = festius_fixes[0];
    festius_fixes.forEach(festiu => {
        db.execute(
            "INSERT INTO Guardia (places, torn, zona, categoria, data, usuariMOD) VALUES (?, ?, ?, ?, ?, ?)",
            [plantilla["places"], plantilla["torn"], plantilla["zona"], plantilla["categoria"], festiu["data"], "admin"]
        )
    })
})


module.exports = {
    getGuardies,
    createGuardia,
    createGuardies
}