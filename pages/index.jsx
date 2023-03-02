import Head from "next/head";
import styles from "../styles/Home.module.css";
import NFTGallery from "../components/nftGallery";
import { useState } from "react";
import Landing from "../components/landing";
import Discover from "../components/discover";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/navigation/navbar";

export default function Home() {
  const [screen, setScreen] = useState('landing')
  const [location, setLocation] = useState({
    latitude: "",
    longitude: ""
  });
  const [muralLocation, setMuralLocation] = useState({
    latitude: "39.7816",
    longitude: "-104.9679"
  });
  const [error, setError] = useState("")
  const [isMinting, setIsMinting] = useState(false);
  const [metadataUrl, setMetadataUrl] = useState(null);
  const [isThere, setIsThere] = useState(false)

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

  return (
    <>
      <div>
        <main className={styles.main}>
          <Navbar
            setScreen={setScreen}
          />
          {(screen === 'landing') ?
            <Landing
              setScreen={setScreen}
            />
            : (screen === 'discover') ? <Discover
              setLocation={setLocation}
              location={location}
              setError={setError}
              error={error}
              isThere={isThere}
              setIsThere={setIsThere}
              muralLocation={muralLocation}
            />
              : (screen === 'murals') ? <NFTGallery />
                : <p>murals is false</p>}
        </main>
      </div>
    </>
  );
}
