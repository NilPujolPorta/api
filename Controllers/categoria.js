const db = require('../Utils/database');

const getCategories = (async (req, res) => {
    try {
        let categories = await returnCategories();
        res.json(categories);
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
    
})

async function returnCategories() {
    let categories = [];
    await db.execute(
        'SELECT * FROM Categoria WHERE actiu = true'
    ).then(result => categories = result[0]);

    return categories;
}

const getCategoria = (async (req, res) => {
    try {
        let categoria = returnCategoria(req.body.categoria);
        res.json(categoria);
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
    
})

async function returnCategoria(nom_categoria) {
    let categoria = [];
    await db.execute(
        'SELECT * FROM Categoria WHERE nom = ? AND actiu = true',
        [nom_categoria]
    ).then(result => categoria = result[0]);

    return categoria;
}

const createCategoria = (async (req, res) => {
    try {
        let categoria = await returnCategoria(req.body.nom);
        if (categoria[0] == undefined) {
            await db.execute(
                'INSERT INTO Categoria (nom, usuariMOD) VALUES(?, ?)',
                [req.body.nom, req.body.usuariMOD]
            )
            res.status(201).json({missatge: "Categoria afegida"})

        } else {
            res.status(400).json({missatge: "Aquesta categoria ja existeix"})
        }
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})

const deactivateCategoria = (async (req, res) => {
    try {
        await db.execute(
            'UPDATE Categoria SET actiu = false AND usuariMOD = ? WHERE nom = ?',
            [req.body.usuariMOD, req.body.nom]
        )
        res.status(201).send("Categoria desactivada")
    } catch (error) {
        res.status(400).json({ missatge: error })
    }
})


module.exports = {
    getCategories,
    createCategoria,
    getCategoria,
    deactivateCategoria
}