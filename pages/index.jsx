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
import { ethers, contract, signer } from "ethers";
import { useWeb3Modal } from "@web3modal/react";
import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useContractWrite,
  useNetwork,
  useSigner,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";
import smartContract from '../contractConfig.json'


export default function Home() {
  const CONTRACT_ADDRESS = "0xA67236eD1426b1F817C434477925C6efa21BeddC";
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
  const [copied, setCopied] = useState(false)
  const [signature, setSignature] = useState()

  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  const { address, isConnected } = useAccount();



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


  // This is where the mint function goes
  const { data, isLoading, isSuccess, write } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: CONTRACT_ADDRESS,
    abi: smartContract.abi,
    functionName: "verifyHash",
    // args: [],
    chainId: 84531,
  });


  const mintTokens = async () => {

    if (!isConnected) {
      open();
    } else if (isConnected) {
      console.log("wallet is connected")
    };
    // Create a wallet to sign the hash with
    const wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY);
    console.log(wallet.address);
    // Sign the binary data
    const message = "hello";//Later will be implemented crypto hash for each request 
    const sig = await wallet.signMessage(message);

    const signingAddress = ethers.utils.verifyMessage(message, sig)
    console.log("Message Signer ", signingAddress);
    if (signingAddress === wallet.address) {

      const mintResult = write({
        recklesslySetUnpreparedArgs: [
          message,
          sig,
        ],
        validate: true
      });
    }
  };



  /*   const rabsVersion = async () => {
      let message = "hello";
      let { data } = await axios.post('https://185.252.233.36:4782/getSignedMessage', { message });
      console.log(data)
    } */

  ////////////////////////
  const copyToClipboard = () => {
    console.log("copy")
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


  // Check if the browser supports geolocation and other minting status
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.log("geolocation is not supported")
    } else {
      console.log("browser supported")
    }

  }, [])

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
                  className="h-full"
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


                  {isThere ? <button className="border border-2 border-black rounded p-2 mt-2 w-5/6 md:w-[250px] bg-primary active:bg-secondary"
                    onClick={mintTokens}>Claim!</button>
                    : <button
                      className="text-white border border-2 border-black rounded p-2 mt-2 w-5/6 md:w-[250px] bg-secondary active:bg-primary"
                      onClick={userLocation}>Test Location to Claim</button>}

                  {isThere.toString()}
                </>
                : <p>murals is false</p>}
        </main>
      </div>
    </>
  );
}
