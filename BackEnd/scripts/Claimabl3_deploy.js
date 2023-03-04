const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const GemFi = await hre.ethers.getContractFactory("Claimabl3");
    console.log('Deploying Claimabl3...');
    const token = await GemFi.deploy();

    await token.deployed();
    console.log("Claimabl3 deployed to:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });