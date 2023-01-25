const db = require('../Utils/database');

const apuntarTreballador = (async (req, res) => {
    const estat = req.body.estat;
    const idGuardia = req.body.idGuardia;
    const usuari = req.body.usuari;
    const usuariMOD = req.body.usuariMOD;
    try {
        db.execute(
            "INSERT INTO TreballadorsApuntats (estat, idGuardia, usuari, usuariMOD) VALUES (?, ?, ?, ?)",
            [estat, idGuardia, usuari, usuariMOD]
        )

        res.status(201).json({ missatge: "Treballador apuntat correctament" });
    } catch (error) {
        res.status(400).json({ missatge: error });
    }

})

const getTrebelladorsApuntats = (async (req, res) => {
    let resposta = [];
    await db.execute(
        "SELECT * FROM TreballadorsApuntats"
    ).then(result => resposta = result[0]);
    res.json(resposta);
})

const getIDTreballadorsByIdGuardia = (async (req, res) => {
    let resposta = [];
    const id = req.body.idGuardia;
    await db.execute(
        "SELECT * FROM TreballadorsApuntats WHERE idGuardia = ?",
        [id]
    ).then(result => resposta = result[0]);
    res.json(resposta);
})

const getIDGuardiesByTreballador = (async (req, res) => {
    let resposta = [];
    const id = req.body.usuari;
    await db.execute(
        "SELECT * FROM TreballadorsApuntats WHERE usuari = ?",
        [id]
    ).then(result => resposta = result[0]);
    res.json(resposta);
})

const desapuntarTreballador = (async (req, res) => {
    try {
        await db.execute(
            "UPDATE TreballadorsApuntats SET estat = 'desapuntat' WHERE idGuardia = ? AND usuari = ?",
             [req.body.idGuardia, req.body.usuari]
        )
        res.status(201).json({ missatge: "Treballador desapuntat" })
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})


module.exports = {
    apuntarTreballador,
    getTrebelladorsApuntats,
    getIDGuardiesByTreballador,
    getIDTreballadorsByIdGuardia,
    desapuntarTreballador
}