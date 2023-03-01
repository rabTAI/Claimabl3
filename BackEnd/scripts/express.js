//JavaScript code should be executed in "strict mode"
'use strict'

// const ethUtil = require('ethereumjs-util')
// const sigUtil = require('eth-sig-util')
//Main file

const { app } = require('./index.js');
const { ethers } = require("ethers");

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

//When FrontEnd requests a signed message
app.post('/getSignedMessage', async (req, res) => {
    const {
        code // The secret code to sign
    } = (req.body)
    try {
        // Create a wallet to sign the hash with
        let wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY);
        console.log(wallet.address);

        // The hash we wish to sign and verify
        let messageHash = ethers.utils.id(code);

        //Convert to 32 byte array
        let messageHashBytes = ethers.utils.arrayify(messageHash)

        // Sign the binary data
        let flatSig = await wallet.signMessage(messageHashBytes);

        return res.json({ signedMessage: flatSig });
    } catch (err) {
        console.log("ERR ", err)
        return res.json({ signedMessage: err });
    }
});
