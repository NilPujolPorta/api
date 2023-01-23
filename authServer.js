// Configuració bàsica servei APIREST

require("dotenv").config();
const express = require('express');
const app = express();

const userRoutes = require('./Routes/user.js');
const categoriaRoutes = require('./Routes/categoria.js');
const diaRoutes = require('./Routes/dia.js');
const festiusFixesRoutes = require('./Routes/festiusFixes.js');
const guardiaRoutes = require('./Routes/guardia.js');
const plantillesRoutes = require('./Routes/plantilles.js');
const userArticles = require('./Routes/article.js')
const zonaRoutes = require('./Routes/zona.js')
const tornRoutes = require('./Routes/torn.js')

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/categoria', categoriaRoutes);
app.use('/api/dia', diaRoutes);
app.use('/api/festiusFixes', festiusFixesRoutes);
app.use('/api/guardia', guardiaRoutes);
app.use('/api/plantilles', plantillesRoutes);
app.use('/api/article', userArticles);
app.use('/api/zona', zonaRoutes);
app.use('/api/torn', tornRoutes);


const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () => {
    console.log(`Authorization Server running on ${port} listening`);
})

