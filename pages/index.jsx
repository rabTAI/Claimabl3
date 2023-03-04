import Head from "next/head";
import styles from "../styles/Home.module.css";
import NFTGallery from "../components/nftGallery";
import { useState } from "react";
import Landing from "../components/landing";
import Discover from "../components/discover";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/navigation/navbar";
import Artists from "../utils/artists.js";
import Image from "next/image";
import MintButton from "../components/mintButton";
import { getPreciseDistance } from 'geolib';
import axios from 'axios';
import { ethers } from "ethers";

export default function Home() {
  const [screen, setScreen] = useState('landing')
  const [location, setLocation] = useState({
    lat: "",
    lng: ""
  });
  const [muralLocation, setMuralLocation] = useState({
    lat: "",
    lng: ""
  });
  const [error, setError] = useState("")
  const [isMinting, setIsMinting] = useState(false);
  const [metadataUrl, setMetadataUrl] = useState(null);
  const [isThere, setIsThere] = useState(false);
  const [selectedMural, setSelectedMural] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // This needs to be the location of each mural
  const targetLocation = [80, 80]

  // Check if the browser supports geolocation
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.log("geolocation is not supported")
    } else {
      console.log("browser supported")
    }
  })

  const userLocation = () => {
    const coordinates = navigator.geolocation

    function success(pos) {
      const crd = pos.coords;
      setLocation({ latitude: crd.latitude, longitude: crd.longitude })
      return crd
    }

    function error(err) {
      console.log("error:", err)
      setError(`Oops...something went wrong. Make sure location services is turned on for your browser.`)
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    coordinates.getCurrentPosition(success, error, options)

    // Calculate distancde between user and mural and convert to feet, uses geolib - npm
    const distance = getPreciseDistance(location, muralLocation) * 3.280839895

    // Check user distance to mural
    if (true/* distance < 150 */) {
      setIsThere(true)
    } else {
      setIsThere(false)
    }
    console.log("precise distance", distance, "feet")
    console.log("are you close enough?", isThere)
  }

  const mintNFT = async () => {
    setIsLoading(true)
    let message = "hello";//Later will be implemented crypto hash for each request 
    let { data } = await axios.post('/.netlify/functions/getSignedMessage', { message });
    const signingAddress = ethers.utils.verifyMessage(message, data.signature)
    console.log("Message Signer ", signingAddress);

    if (signingAddress === "0xdB35C36CdBdD56008D73e43ef64F5F12c492883f") {
      let tx = await contract.verifyHash(message, data.signature);
    } else {
      console.log("wrong address!")
    }
    setIsLoading(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${muralLocation.lat}, ${muralLocation.lng}`)
    setCopied(true)
    setTimeout(() => {
      setCopied(false);
    }, 2000)
  }

  const backToMap = () => {
    setScreen("discover")
    setMuralLocation("")
  }


  return (
    <>
      <Head>
        <title>Claimabl3</title>
        <meta property="og:title" content="Claimabl3" key="title" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className={styles.main}>
          <Navbar
            setScreen={setScreen}
          />
          {(screen === 'landing') ?
            <Landing
              setScreen={setScreen}
            />
            : (screen === 'discover') ?
              <>
                <Discover
                  setLocation={setLocation}
                  location={location}
                  setError={setError}
                  error={error}
                  isThere={isThere}
                  setIsThere={setIsThere}
                  muralLocation={muralLocation}
                  setMuralLocation={setMuralLocation}
                  setScreen={setScreen}
                  setSelectedMural={setSelectedMural}
                  copied={copied}
                  setCopied={setCopied}
                />
              </>
              : (screen === 'mural-detail') ?
                <>
                  <div
                    className="cursor-pointer hover:text-secondary"
                    onClick={backToMap}
                  >Back to Map</div>
                  <div
                    className="w-full md:w-2/6 mx-auto"
                  >
                    <Image
                      src={selectedMural.src}
                      alt="Photo of the work"
                      width={500}
                      height={500}
                      className="w-full"
                    />
                    <div
                      className={`block left-0 px-4 mt-2`}
                    >
                      <b>Artist:</b> {selectedMural.artist} <br />
                      <b>Description:</b> {selectedMural.description}<br />
                      <p className={`${copied ? "bg-primary visible" : "hidden"} text-center w-1/2 mx-auto rounded`}>Copied!</p>
                      <b>Coordinates:</b> {selectedMural.location.lat}, {selectedMural.location.lng}
                      <Image
                        src={"/Copy.svg"}
                        alt="Copy Icon"
                        width={20}
                        height={20}
                        className="inline ml-2 cursor-pointer"
                        onClick={copyToClipboard}
                      />
                    </div>
                  </div>


                  {isThere ? <button className="border border-2 border-black rounded p-2 mt-2 w-5/6 md:w-[250px] bg-primary active:bg-primary"
                    onClick={mintNFT}>Claim!</button>
                    : <button
                      className="text-white border border-2 border-black rounded p-2 mt-2 w-5/6 md:w-[250px] bg-secondary active:bg-secondary"
                      onClick={userLocation}>Test Location to Claim</button>}

                  {isThere.toString()}
                </>
                : <p>murals is false</p>}
        </main>
      </div>
    </>
  );
}
