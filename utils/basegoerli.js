var baseGoerli = {
    id: 84531,
    name: "baseGoerli",
    network: "baseGoerli",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
        default: {
            http: ["https://base-goerli.rpc.thirdweb.com"],
            webSocket: ["wss://base-goerli.rpc.thirdweb.com"]
        },
        public: {
            http: ["https://base-goerli.rpc.thirdweb.com"],
            webSocket: ["wss://base-goerli.rpc.thirdweb.com"]
        }
    },
    blockExplorers: {
        default: {
            name: "baseScan",
            url: "https://goerli.basescan.org/"
        }
    },
    testnet: true
};

exports.baseGoerli = baseGoerli;