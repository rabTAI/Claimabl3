import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ConnectButton from '@/components/ConnectButton';
import { Web3Modal } from "@web3modal/react";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";


import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, mainnet, polygon } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "ad87f6e941189959f75b0266dda1dc83" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: "ad87f6e941189959f75b0266dda1dc83",
    version: "1", // or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);


const inter = Inter({ subsets: ['latin'] })


export default function Home() {


  const [location, setLocation] = useState({
    latitude: "",
    longitude: ""
  });
  const [error, SetError] = useState("")

  const targetLocation = [80, 80]

  const userLocation = () => {
    const coordinates = navigator.geolocation

    function success(pos) {
      const crd = pos.coords;
      setLocation({ latitude: crd.latitude, longitude: crd.longitude })
    }

    function error(err) {
      console.log("error:", err)
      SetError(`Oops... ${err}`)
    }


    coordinates.getCurrentPosition(success, error)
  }

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.log("geolocation is not supported")
    } else {
      console.log("browser supported")
    }
  })

  return (
    <>
      <Head>
        <title>Claimabl3</title>
        <meta name="description" content="Geo-locked NFTs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-8 flex flex-col items-center">
        <h1
          className='text-center text-4xl'
        >Claimabl3</h1>

        <h3
          className='mt-4 border border-1 w-[400] p-2 text-center cursor-pointer'
          onClick={userLocation}
        >Prove My Location</h3>
        <p>{error}</p>

        <Web3Modal
          projectId="ad87f6e941189959f75b0266dda1dc83"
          ethereumClient={ethereumClient}
        />

        <div>
          <p className='mt-2'>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
        <ConnectButton>
        </ConnectButton>
      </main>
    </>
  )
}
