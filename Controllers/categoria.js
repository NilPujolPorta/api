const db = require('../Utils/database');

const getCategories = (async (req, res) => {
    let categories = returnCategories();

    res.json(categories);
})

async function returnCategories() {
    let categories = [];
    await db.execute(
        'SELECT * FROM Categoria'
    ).then(result => categories = result[0]);
}

const getCategoria = (async (req, res) => {
    let categoria = returnCategoria(req.body.categoria);
    res.json(categoria);
})

async function returnCategoria(nom_categoria) {
    let categoria = [];
    await db.execute(
        'SELECT * FROM Categoria WHERE nom = ?',
        [nom_categoria]
    ).then(result => categoria = result[0]);

    return categoria;
}

const createCategoria = (async (req, res) => {
    let cat = await returnCategoria(req.body.nom);
    if (cat[0] == undefined) {
        await db.execute(
            'INSERT INTO Categoria (nom, usuariMOD) VALUES(?, ?)',
            [req.body.nom, req.body.usuariMOD]
        )
        res.status(201).json({ missatge: "Categoria afegida" })

    } else {
        res.status(403).json({ missatge: "Aquesta categoria ja existeix" })
    }

})


module.exports = {
    getCategories,
    createCategoria,
    getCategoria
}