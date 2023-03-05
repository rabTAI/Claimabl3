//JavaScript code should be executed in "strict mode"
'use strict'

require('dotenv').config({ path: './.env' });

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
app.listen(4782, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Express Server is listening on port 4782, make sure to double check the server.`);
    //Start express too
    require(`./express.js`)
});

module.exports = {
    app: app
};