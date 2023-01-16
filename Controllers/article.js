const Article = require("../Model/Implementations/Article/article")


const preuvVenta = (async (req,res) => {
    const article = new Article(req.body.name,req.body.cost);
    res.status(201).send({nom:article.name,cost:article.cost,preu:article.preuVenta()})
    
})

module.exports = {
 preuvVenta
}