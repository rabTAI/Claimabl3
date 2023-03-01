import styles from "../styles/Home.module.css";
import NFTGallery from "../components/nftGallery";
import { useState } from "react";
import Landing from "../components/landing";
import Discover from "../components/discover";
import { useEffect } from "react";

export default function Home() {
  const [screen, setScreen] = useState('landing')
  const [location, setLocation] = useState({
    latitude: "",
    longitude: ""
  });
  const [error, SetError] = useState("")

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

  console.log(screen)

  return (
    <div>
      <main className={styles.main}>
        {(screen === 'landing') ?
          <Landing
            setScreen={setScreen}
          />
          : (screen === 'discover') ? <Discover
            setLocation={setLocation}
            location={location}
          />
            : (screen === 'murals') ? <NFTGallery />
              : <p>murals is false</p>}
      </main>
    </div>
  );
}
