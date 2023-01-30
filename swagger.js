const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./authServer.js']

swaggerAutogen(outputFile, endpointsFiles)