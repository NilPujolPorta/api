const db = require('../Utils/database');

const apuntarTreballador = (async (req, res) => {
    const idGuardia = req.body.idGuardia;
    const usuari = req.body.usuari;
    const usuariMOD = req.body.usuariMOD;
    try {
        db.execute(
            "INSERT INTO TreballadorsApuntats (estat, idGuardia, usuari, usuariMOD) VALUES ('apuntat', ?, ?, ?)",
            [idGuardia, usuari, usuariMOD]
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
            "UPDATE TreballadorsApuntats SET estat = 'desapuntat' AND usarMOD = ? WHERE idGuardia = ? AND usuari = ?",
             [req.body.usuariMOD, req.body.idGuardia, req.body.usuari]
        )
        res.status(201).json({ missatge: "Treballador desapuntat" })
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})

const seleccioTreballadors = (async (req, res) => {
    try {
        let usuarisTriats =  req.body.usuarisTriats;
        let usuarisNoTriats =  req.body.usuarisNoTriats;
        await ferSeleccio(usuarisTriats, usuarisNoTriats, req.body.idGuardia, req.body.usuariMOD);
        
        res.status(201).json({ missatge: "Selecció feta" })
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})

async function ferSeleccio(usuarisTriats, usuarisNoTriats, idGuardia, usuariMOD){
    try {
        await usuarisTriats.forEach(usuari => {
            db.execute(
                "UPDATE TreballadorsApuntats SET estat = 'triat', usuariMOD = ? WHERE idGuardia = ? AND usuari = ?",
                 [usuariMOD, idGuardia, usuari]
            )
        });
    
        await usuarisNoTriats.forEach(usuari => {
            db.execute(
                "UPDATE TreballadorsApuntats SET estat = 'no triat', usuariMOD = ? WHERE idGuardia = ? AND usuari = ?",
                 [usuariMOD, idGuardia, usuari]
            )
        });
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    apuntarTreballador,
    getTrebelladorsApuntats,
    getIDGuardiesByTreballador,
    getIDTreballadorsByIdGuardia,
    desapuntarTreballador,
    seleccioTreballadors
}