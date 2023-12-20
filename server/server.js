const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const birth = require('./routs/birth');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API birth',
        version: '1.0.0',
        description: 'To receive information about birthdays, and send an email with birthday greetings.'
    },
      servers: [
        {
          url: 'http://localhost:3001',
        },
      ],
    },
    apis: ['./routs/*.js'],
  };

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/birth', birth);

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
