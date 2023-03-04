import { MapContainer, TileLayer, Marker, Popup, Icon } from 'react-leaflet'
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import { useState } from 'react'
import Image from 'next/image'
import Artists from "../utils/artists.js"

export default function Map({ location, setScreen, setSelectedMural }) {
    // Map properties
    // Centering the Map on Denver
    const [position, setPosition] = useState({ lat: 39.7392, lng: -104.9903 })
    const [copied, setCopied] = useState(false)

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

    const copyToClipboard = (e) => {
        const muralLocation = document.getElementById("copy-location")
        navigator.clipboard.writeText(muralLocation.outerText)
        setCopied(true)
        setTimeout(() => {
            setCopied(false);
        }, "2000")
    }

    const captureArtist = (artist) => {
        setSelectedMural(artist)
        console.log("selecting the artist", artist)
        setScreen("mural-detail")
    }

    return (
        <>
            <MapContainer id="map" className="z-10" center={position} zoom={ZOOM_LEVEL} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ul>
                    {Artists.artists.map((artist) => (
                        <li key={artist.id}>
                            {console.log(artist.id)}
                            <Marker position={artist.location} icon={icon}>
                                <Popup>
                                    <div className={`${copied ? `visible bg-primary` : `hidden`}`}>Copied!</div>
                                    Artist: {artist.artist} <br />Description: {artist.description}
                                    <br />Location:
                                    <div id="copy-location" className="inline cursor-pointer font-bold z-10" onClick={copyToClipboard}> {artist.location.lat}, {artist.location.lng}
                                        <Image
                                            src={"/Copy.svg"}
                                            alt="Copy Icon"
                                            width={20}
                                            height={20}
                                            className="inline ml-2"
                                            onClick={copyToClipboard}
                                        />
                                    </div>
                                    <Image
                                        src={artist.src}
                                        alt="Photo of the work"
                                        width={100}
                                        height={100}
                                        className="mx-auto mt-2"
                                    />
                                    <p
                                        className="cursor-pointer hover:text-secondary"
                                        onClick={() => captureArtist(artist)}
                                    >Details...</p>
                                </Popup>
                            </Marker>
                        </li>
                    ))}
                </ul>
            </MapContainer>
        </>
    )
}