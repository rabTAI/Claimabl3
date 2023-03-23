import '../styles/globals.css';
import 'leaflet/dist/leaflet.css';
import MainLayout from '../layout/mainLayout';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { baseGoerli } from 'wagmi/chains';

const chains = [baseGoerli];
const projectId = 'bc48326f8b7d0f6c85abe369f8016774';

// Wagmi client
const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default MyApp;
