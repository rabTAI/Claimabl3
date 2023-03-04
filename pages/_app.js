import "../styles/globals.css";
import 'leaflet/dist/leaflet.css'
import Head from "next/head";
import MainLayout from "../layout/mainLayout";

import {
	EthereumClient,
	modalConnectors,
	walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, baseGoerli } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon, baseGoerli];

// Wagmi client
const { provider } = configureChains(chains, [
	walletConnectProvider({ projectId: "bc48326f8b7d0f6c85abe369f8016774" }),
]);

const wagmiClient = createClient({
	autoConnect: true,
	connectors: modalConnectors({
		projectId: "bc48326f8b7d0f6c85abe369f8016774",
		version: "1", // or "2"
		appName: "web3Modal",
		chains,
	}),
	provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);


function MyApp({ Component, pageProps }) {
	return (
		<>
			<WagmiConfig client={wagmiClient}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</WagmiConfig>

			<Web3Modal
				projectId="bc48326f8b7d0f6c85abe369f8016774"
				ethereumClient={ethereumClient}
			/>
		</>

	);
}

export default MyApp;
