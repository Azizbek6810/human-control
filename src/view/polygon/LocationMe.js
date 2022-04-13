import React, {useState, useRef} from "react";
import AddIcon from '@mui/icons-material/Add';
import {Marker} from "react-leaflet";
import L from "leaflet";
import useGeoLocation from "/src/store/location/useGeoLocation";

const markerIcon = new L.Icon({
    iconUrl: require("src/images/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
});
function MyPolygon() {

    const ZOOM_LEVEL = 17;
    const mapRef = useRef();
    const location = useGeoLocation();


    const showMyLocation = () => {
        if (location.loaded && !location.error) {
            mapRef.current.leafletElement.flyTo(
                [location.coordinates.lat, location.coordinates.lng],
                ZOOM_LEVEL,
                {animate: true}
            );
        } else {
            alert(location.error.message);
        }
    };

    return (
        <div>
            {location.loaded && !location.error && (
                <Marker
                    icon={markerIcon}
                    position={[
                        location.coordinates.lat,
                        location.coordinates.lng,
                    ]}
                ></Marker>
            )}
            <button className="" onClick={showMyLocation}>
                <AddIcon/>
            </button>
        </div>
    )
}

export default MyPolygon