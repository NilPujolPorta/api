const bcrypt = require('bcrypt');
const db = require('../../../Utils/database');

module.exports = class User {
    email;
    password;
    name;
    surname;
    category;

    constructor(email, password, name, surname, category){
        this.name = name;
        this.email = email;
        this.password = password;
        this.surname = surname;
        this.category = category;
    }

    static async encrypt(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        return hashedPassword;
    }

    static login(email) {
        return db.execute(
            'SELECT * FROM Treballador WHERE usuari = ?',
            [email]
        );
    }

    static save(user) {
        return db.execute(
            'INSERT INTO Treballador (usuari, contrasenya, nom, cognoms, categoria) VALUES(?, ?, ?, ?, ?)',
            [user.email, user.password, user.name, user.surname , user.category]
        );
    }

    static getPlantilles() {
        return db.execute(
            'SELECT * FROM Plantilles'
        );
    }

    static async createGuardies(plantilla) {
        let festius_fixes = Array();
        festius_fixes = await this.getFestiusFixes();
        console.log("Festius");
        console.log(festius_fixes[0])
    }
    
    static getFestiusFixes() {
        return db.execute(
            'SELECT * FROM FestiusFixes'
        );
    }
}
