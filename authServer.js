// Configuració bàsica servei APIREST

require("dotenv").config();
const express = require('express');
const app = express();

const userRoutes = require('./Routes/user.js');
const categoriaRoutes = require('./Routes/categoria.js');
const userArticles = require('./Routes/article.js')
const zonaRoutes = require('./Routes/zona.js')

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/categoria', categoriaRoutes);
app.use('/api/article', userArticles);
app.use('/api/zona', zonaRoutes);


const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () => {
    console.log(`Authorization Server running on ${port} listening`);
})

