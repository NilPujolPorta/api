const db = require('../Utils/database');

const apuntarTreballador = (async (req, res) => {
    const estat = req.body.estat;
    const idGuardia = req.body.idGuardia;
    const usuari = req.body.usuari;
    const usuariMOD = req.body.usuariMOD;
    db.execute(
        "INSERT INTO TreballadorsApuntats (estat, idGuardia, usuari, usuariMOD) VALUES (?, ?, ?, ?)",
        [estat, idGuardia, usuari, usuariMOD]
    )

    res.status(201).json({ message: "Treballador apuntat correctament" });
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
        "SELECT * FROM TreballadorsApuntats where idGuardia = ?",
        [id]
    ).then(result => resposta = result[0]);
    res.json(resposta);
})

const getIDGuardiesByTreballador = (async (req, res) => {
    let resposta = [];
    const id = req.body.usuari;
    await db.execute(
        "SELECT * FROM TreballadorsApuntats where usuari = ?",
        [id]
    ).then(result => resposta = result[0]);
    res.json(resposta);
})


module.exports = {
    apuntarTreballador,
    getTrebelladorsApuntats,
    getIDGuardiesByTreballador,
    getIDTreballadorsByIdGuardia
}