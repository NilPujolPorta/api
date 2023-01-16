// Configuració bàsica servei APIREST

require("dotenv").config();
const express = require('express');
const app = express();

const userRoutes = require('./Routes/user.js');
const userArticles = require('./Routes/article.js')

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/article', userArticles);


const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () =>{
    console.log(`Authorization Server running on ${port} listening`);
})

