import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import 'leaflet/dist/leaflet.css'
import Head from "next/head";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
	mainnet,
	polygon,
	optimism,
	arbitrum,
	goerli,
	polygonMumbai,
	optimismGoerli,
	arbitrumGoerli,
	baseGoerli,

} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";

const { chains, provider } = configureChains(
	[
		mainnet,
		goerli,
		polygon,
		polygonMumbai,
		optimism,
		optimismGoerli,
		arbitrum,
		arbitrumGoerli,
		baseGoerli,
	],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "My Alchemy DApp",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

// client side rendering for openstreetmap



export { WagmiConfig, RainbowKitProvider };
function MyApp({ Component, pageProps }) {
	return (

		<WagmiConfig client={wagmiClient}>

			<RainbowKitProvider
				modalSize="compact"
				initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
				chains={chains}
			>
				<Head>
					<link rel="shortcut icon" href="/favicon.ico" />
				</Head>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>

			</RainbowKitProvider>

		</WagmiConfig>

	);
}

export default MyApp;
