require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const BASE_API_KEY = process.env.BASE_API_KEY;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

module.exports = {
  solidity: {
    version: "0.8.19",
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
    base_testnet: {
      url: "https://base-goerli.rpc.thirdweb.com",
      chainId: 84531,
      accounts: [DEPLOYER_PRIVATE_KEY],
      tags: ["test"],
    },
    base_mainnet: {
      url: "",
      chainId: 0,
      accounts: [DEPLOYER_PRIVATE_KEY],
      tags: ["main"],
    },
  },
  etherscan: {
    apiKey: BASE_API_KEY,
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