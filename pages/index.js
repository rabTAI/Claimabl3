import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ConnectButton from '@/components/ConnectButton';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: ""
  });

  const userLocation = () => {
    const coordinates = navigator.geolocation

    function success(pos) {
      const crd = pos.coords;
      setLocation({ latitude: crd.latitude, longitude: crd.longitude })
      console.log(location)
    }

    function error(err) {
      console.log("error:", err)
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
          className='mt-4 border border-1 w-[400] p-2 text-center'
          onClick={userLocation}
        >Prove My Location</h3>
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
