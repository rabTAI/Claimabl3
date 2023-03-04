const { ethers } = require("ethers");

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

//When FrontEnd requests a signed message
export const func = async (req, res) => {
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
};