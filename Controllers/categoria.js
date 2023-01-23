const db = require('../Utils/database');

const getCategories = (async (req, res) => {
    let categories = [];
    await db.execute(
        'SELECT * FROM Categoria'
    ).then(result => categories = result[0]);
    console.log(categories);

    res.json(categories);
})


module.exports = {
    getCategories
}