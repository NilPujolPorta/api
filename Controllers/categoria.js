const db = require('../Utils/database');

const getCategories = (async (req, res) => {
    let categories = [];
    await db.execute(
        'SELECT * FROM Categoria'
    ).then(result => categories = result[0]);

    res.json(categories);
})

const createCategoria = (async (req, res) => {
    await db.execute(
        'INSERT INTO Categoria (nom, usuariMOD) VALUES(?, ?)',
        [req.body.nom, req.body.usuariMOD]
    )
    res.status(201).json({missatge: "Categoria afegida"})
})


module.exports = {
    getCategories,
    createCategoria
}