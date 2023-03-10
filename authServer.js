// Configuració bàsica servei APIREST

require("dotenv").config();
const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const cors = require("cors")

const categoriaRoutes = require('./Routes/categoria.js');
const diaRoutes = require('./Routes/dia.js');
const festiusFixesRoutes = require('./Routes/festiusFixes.js');
const guardiaRoutes = require('./Routes/guardia.js');
const plantillesRoutes = require('./Routes/plantilles.js');
const zonaRoutes = require('./Routes/zona.js')
const tornRoutes = require('./Routes/torn.js')
const treballadorsApuntatsRoutes = require('./Routes/treballadorsApuntats.js')
const treballadorRoutes = require('./Routes/treballador.js')

app.use(cors())
app.use(express.json());
app.use('/api/categoria', categoriaRoutes);
app.use('/api/dia', diaRoutes);
app.use('/api/festiusFixes', festiusFixesRoutes);
app.use('/api/guardia', guardiaRoutes);
app.use('/api/plantilles', plantillesRoutes);
app.use('/api/zona', zonaRoutes);
app.use('/api/torn', tornRoutes);
app.use('/api/treballadorsApuntats', treballadorsApuntatsRoutes);
app.use('/api/treballador', treballadorRoutes);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.TOKEN_SERVER_PORT;

app.listen(port, () => {
    console.log(`Authorization Server running on ${port} listening`);
})

