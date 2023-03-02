import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'




export default function Map({ location }) {
    //Map properties
    const [center, setCenter] = useState({ lat: 39.7392, lng: -104.9903 })
    const ZOOM_LEVEL = 13
    /*     const mapRef = useRef() */
    return (

        <>
            <MapContainer id="map" className="z-10" center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={center}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    )
}