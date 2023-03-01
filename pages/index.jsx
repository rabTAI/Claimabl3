import styles from "../styles/Home.module.css";
import NFTGallery from "../components/nftGallery";
import { useState } from "react";
import Landing from "../components/landing";
import Discover from "../components/discover";

export default function Home() {
  const [screen, setScreen] = useState('landing')

  console.log(screen)

  return (
    <div>
      <main className={styles.main}>
        {(screen === 'landing') ?
          <Landing
            setScreen={setScreen}
          />
          : (screen === 'discover') ? <Discover />
            : (screen === 'murals') ? <NFTGallery />
              : <p>murals is false</p>}
      </main>
    </div>
  );
}
