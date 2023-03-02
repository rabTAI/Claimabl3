import { useAccount } from 'wagmi';
import dynamic from "next/dynamic";
import { useState } from 'react';
import { useEffect } from 'react';

export default function Discover({ location, setLocation }) {
    /*     const [isConnected, setIsConnected] = useState(false) */

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

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        coordinates.getCurrentPosition(success, error, options)
    }

    const mintNft = () => {
        console.log("this button will mint an NFT")
    }



    const { address, connector, isConnected } = useAccount()
    console.log(isConnected)

    const Map = dynamic(() => import('../components/map'), {
        ssr: false
    });


    return (
        <>
            <h1 className="text-6xl mx-6">Map!</h1>

            <Map
                location={location}
            />
            <div>
                <p className='mt-2'>Latitude: {location.latitude}</p>
                <p>Longitude: {location.longitude}</p>
            </div>

            <div className="flex flex-row">
                <button
                    className="fixed inline text-lg group bottom-12 left-12"
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
                    className="fixed inline text-lg group bottom-12 right-12"
                    onClick={mintNft}
                    disabled={false}
                >
                    <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                        <span className="relative">Mint</span>
                    </span>
                    <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                </button>
            </div>
        </>
    );
}