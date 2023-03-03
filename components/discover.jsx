import { useAccount } from 'wagmi';
import dynamic from "next/dynamic";
import { useState } from 'react';
import { useEffect } from 'react';
import { getPreciseDistance } from 'geolib';

export default function Discover({ location, setLocation, setError, error, isThere, setIsThere, muralLocation }) {
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
            setError(`Oops... ${err.message}`)
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        coordinates.getCurrentPosition(success, error, options)

        // Calculate distancde between user and mural and convert to feet, uses geolib - npm
        const distance = getPreciseDistance(location, muralLocation) * 3.280839895

        if (distance < 1500) {
            setIsThere(true)
        } else {
            setIsThere(false)
        }

        console.log("precise distance", distance, "feet")
        console.log("are you close enough?", isThere)

    }

    const mintNft = () => {
        console.log("this button will mint an NFT")
    }

    const { address, connector, isConnected } = useAccount()

    const Map = dynamic(() => import('../components/map'), {
        ssr: false
    });


    return (
        <>
            {error ? <div className="w-5/6">{error}</div> :
                <div>
                    <div className="flex flex-col w-screen">
                        <Map
                            location={location}
                        />

                        <div className="flex flex-row justify-between mt-2">
                            <button
                                className="relative inline text-lg group left-12"
                                onClick={userLocation}
                            >
                                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                    <span className="relative">I'm Here!</span>
                                </span>
                                <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                            </button>

                            <button
                                className={`${isThere ? null : `cursor-not-allowed`} relative inline text-lg group right-12`}
                                onClick={mintNft}
                                disabled={!isThere}
                            >
                                <span className={`relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white`}>
                                    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                    <span className="relative">Mint</span>
                                </span>
                                <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                            </button>
                        </div>
                        <div>
                            <p className='mt-2 text-center'>Your Latitude: {location.latitude}</p>
                            <p className='mt-2 text-center'>Your Longitude: {location.longitude}</p>
                            <p className='mt-2 text-center'>Are you close enough? {isThere.toString()}</p>
                        </div >
                    </div >
                </div >}
        </>
    );
}