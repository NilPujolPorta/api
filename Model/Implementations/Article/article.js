

class Article {
    name;
    cost;

    constructor(name,cost) {
        this.name=name;
        this.cost=cost;
    }
    
    preuVenta() {
        return this.cost*1.75;
    }
}

module.exports = Article;
