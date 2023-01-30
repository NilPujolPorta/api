// Configuració bàsica servei APIREST

require("dotenv").config();
const express = require('express');
const app = express();
<<<<<<< Updated upstream
=======
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const cors = require("cors")
>>>>>>> Stashed changes

const userRoutes = require('./Routes/user.js');
const userArticles = require('./Routes/article.js')

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/article', userArticles);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () =>{
    console.log(`Authorization Server running on ${port} listening`);
})

