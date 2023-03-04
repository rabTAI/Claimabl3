//JavaScript code should be executed in "strict mode"
'use strict'

const express = require('express');
const app = express();

const { app } = require('./index.js');
const { ethers } = require("ethers");

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

//When FrontEnd requests a signed message
app.post('/getSignedMessage', async (req, res) => {
    const {
        code: message // The secret code to sign
    } = (req.body)
    try {
        // Create a wallet to sign the hash with
        let wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY);
        console.log(wallet.address);
        // Sign the binary data
        let sig = await wallet.signMessage(message);
        return res.json({ signature: sig });
    } catch (err) {
        console.log("ERR ", err)
        return res.json({ signature: err });
    }
});

// Start the server
app.listen(4782, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Express Server is listening on port 4782, make sure to double check the server.`);
});

