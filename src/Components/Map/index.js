import React from 'react'
import  { MapContainer , TileLayer, Marker, Popup} from "react-leaflet";
import {showDataOnMap} from './../../util/showDataOnMap'
import './style.css'


function Map({countries, casesType, center, zoom}) {
    
    const [map, setmap] = React.useState(null);
    if (map) {
        map.flyTo(center);
        
    }
    console.log(casesType);
    React.useEffect(()=> {
        console.log(center)
        
    },[center,zoom])

    return (
        <div className="map__main">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} whenCreated={setmap}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {   
                    showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default Map
