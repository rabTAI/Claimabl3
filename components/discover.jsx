import dynamic from "next/dynamic";
import { getPreciseDistance } from 'geolib';
import axios from 'axios';

export default function Discover({ location, setLocation, setError, error, isThere, setIsThere, muralLocation, setScreen, setSelectedMural, setMuralLocation, setCopied }) {
    /*     const [isConnected, setIsConnected] = useState(false) */

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
        if (distance < 150) {
            setIsThere(true)

            const mintNFT = async () => {
                let message = "hello";//Later will be implemented crypto hash for each request 
                let { data } = await axios.post('/.netlify/functions/checkCode', { message });
                const signingAddress = ethers.utils.verifyMessage(message, data.signature)
                console.log("Message Signer ", signingAddress);

                if (signingAddress === "0xdB35C36CdBdD56008D73e43ef64F5F12c492883f") {
                    let tx = await contract.verifyHash(message, data.signature);
                } else {
                    console.log("wrong address!")
                }
            }
            mintNFT()
        } else {
            setIsThere(false)
        }
        console.log("precise distance", distance, "feet")
        console.log("are you close enough?", isThere)

    }

    const Map = dynamic(() => import('../components/map'), {
        ssr: false
    });

    return (
        <>
            {error ? <div className="w-5/6">{error}</div> :
                <Map
                    location={location}
                    setScreen={setScreen}
                    setSelectedMural={setSelectedMural}
                    muralLocation={muralLocation}
                    setMuralLocation={setMuralLocation}
                    setIsThere={setIsThere}
                    setCopied={setCopied}
                    className=""
                />
            }
        </>
    );
}