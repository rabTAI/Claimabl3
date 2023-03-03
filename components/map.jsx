import { MapContainer, TileLayer, Marker, Popup, Icon } from 'react-leaflet'
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import { useState } from 'react'
import Image from 'next/image'
import Artists from "../utils/artists.js"

export default function Map({ location }) {
    // Map properties
    // Centering the Map on Denver
    const [position, setPosition] = useState({ lat: 39.7392, lng: -104.9903 })

    // Location of Anthony Garcia Sr.'s Work near the National Western
    const [position2, setPosition2] = useState({ lat: 39.7816, lng: -104.9679 })
    const ZOOM_LEVEL = 13

    const markerIconConst = L.icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon,
        iconAnchor: [5, 55],
        popupAnchor: [10, -44],
        iconSize: [25, 55],
    });

    console.log("is this the metadata?!", Artists.artists[0].artist)

    console.log(Artists.artists[0].location)
    console.log(Artists.artists[1].location)

    const icon = L.icon({
        iconUrl: "/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 36]
    });

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
                                    Artist: {artist.artist} <br />Description: {artist.description}
                                    <Image
                                        src={artist.src}
                                        alt="Photo of the work"
                                        width={100}
                                        height={100}
                                    />
                                </Popup>
                            </Marker>
                        </li>
                    ))}
                </ul>
                {/*                 <Marker position={Artists.artists[0].location} icon={markerIconConst}>
                    <Popup>
                        Artist: {Artists.artists[0].artist} <br />Description: {Artists.artists[0].description}
                        <Image
                            src={Artists.artists[0].src}
                            alt="Photo of the work"
                            width={100}
                            height={100}
                        />
                    </Popup>
                </Marker> */}
            </MapContainer>
        </>
    )
}