require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {},
    hardhat: {},
    eth_testnet: {
      url: "https://rpc.sepolia.dev",
      chainId: 11155111,
      accounts: [DEPLOYER_PRIVATE_KEY],
      tags: ["test"],
    },
    eth_mainnet: {
      url: "https://api.mycryptoapi.com/eth",
      chainId: 1,
      accounts: [DEPLOYER_PRIVATE_KEY],
      tags: ["main"],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};