import { MapContainer, TileLayer, Marker, Popup, Icon } from 'react-leaflet'
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import { useState } from 'react'
import Image from 'next/image'
import Artists from "../utils/artists.js"

export default function Map({ location, setScreen, setSelectedMural, muralLocation, setMuralLocation, setIsThere, copied, setCopied }) {
    // Map properties
    // Centering the Map on Denver
    const [position, setPosition] = useState({ lat: 39.7392, lng: -104.9903 })


    // Location of Anthony Garcia Sr.'s Work near the National Western
    const ZOOM_LEVEL = 13

    console.log("is this the metadata?!", Artists.artists[0].artist)

    console.log(Artists.artists[0].location)
    console.log(Artists.artists[1].location)

    const icon = L.icon({
        iconUrl: "/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 36]
    });

    const copyToClipboard = () => {
        const text = document.getElementById("copy-location")
        navigator.clipboard.writeText(text.innerText)
        console.log("copied")
        /*         setCopied(true)
                setTimeout(() => {
                    setCopied(false);
                }, 2000) */
    }

    const captureArtist = (artist) => {
        console.log("selecting the artist", artist)
        setSelectedMural(artist)
        setScreen("mural-detail")
        setMuralLocation(artist.location)
        setIsThere(false)
    }

    return (
        <>
            <MapContainer id="map" className="h-screen w-full" center={position} zoom={ZOOM_LEVEL} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ul>
                    {Artists.artists.map((artist) => (
                        <li key={artist.id}>2
                            {console.log(artist.id)}
                            <Marker position={artist.location} icon={icon}>
                                <Popup
                                >
                                    <div className={`${copied ? `visible bg-primary` : `hidden`}`}>Copied!</div>
                                    Artist: {artist.artist} <br />Description: {artist.description}
                                    <br />Location:
                                    <div id="copy-location" className="inline cursor-pointer font-bold z-10"> {artist.location.lat}, {artist.location.lng}
                                        {/*                                         <Image
                                            src={"/Copy.svg"}
                                            alt="Copy Icon"
                                            width={20}
                                            height={20}
                                            className="inline ml-2"
                                            onClick={copyToClipboard}
                                        /> */}
                                    </div>
                                    <Image
                                        src={artist.src}
                                        alt="Photo of the work"
                                        width={250}
                                        height={250}
                                        className="mx-auto mt-2"
                                    />
                                    <p
                                        className="cursor-pointer hover:text-secondary"
                                        onClick={() => captureArtist(artist)}
                                    >Click here to Claim</p>
                                </Popup>
                            </Marker>
                        </li>
                    ))}
                </ul>
            </MapContainer>
        </>
    )
}