import {Map, Marker, Popup, TileLayer, MapContainer, FeatureGroup,} from "react-leaflet";
import React, {useState} from "react";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import osm from "./osm";
import {EditControl} from "react-leaflet-draw";
import {useRef} from "react";
import "leaflet-draw/dist/leaflet.draw.css";
import useGeoLocation from "../../store/location/useGeoLocation";


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});


function MyLeafletMap() {

    const [center, setCenter] = useState({lat:41.193714230604755, lng: 69.28197274471175});
    const [mapLayers, setMapLayers] = useState([]);
    const mapRef = useRef();

    const ZOOM_LEVEL = 11;

    const location = useGeoLocation();


    // let map = L.map('map').setView([51.505, -0.09], 13);
    //
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);
    //
    // L.marker([51.5, -0.09]).addTo(map)
    //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    //     .openPopup();


    const _onCreate = (e) => {

        console.log(e);

        const {layerType, layer} = e;
        if (layerType === "polygon") {
            const {_leaflet_id} = layer;

            setMapLayers((layers) => [
                ...layers,
                {id: _leaflet_id, latlngs: layer.getLatLngs()[0]},
            ]);
        }
        // else if (layerType === "circle"){
        //     const {_leaflet_id} = layer;
        //
        //     setMapLayers((layers) => [
        //         ...layers,
        //         {id: _leaflet_id, latlngs: layer.getLatLngs()[0]},
        //     ]);
        // }
    };

    const _onEdited = (e) => {
        console.log(e);
        const {
            layers: {_layers},
        } = e;

        Object.values(_layers).map(({_leaflet_id, editing}) => {
            setMapLayers((layers) =>
                layers.map((l) =>
                    l.id === _leaflet_id
                        ? {...l, latlngs: {...editing.latlngs[0]}}
                        : l
                )
            );
        });
    };

    const _onDeleted = (e) => {
        console.log(e);
        const {
            layers: {_layers},
        } = e;

        Object.values(_layers).map(({_leaflet_id}) => {
            setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
        });
    };

    console.log(mapLayers)

    const position = [41.314246, 69.260155]
    return (
        <div>
            <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} style={{width: '98vw', height: '97vh',}}>

                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={_onCreate}
                        onEdited={_onEdited}
                        onDeleted={_onDeleted}
                        draw={{
                            rectangle: true,
                            polyline: true,
                            circle: true,
                            circlemarker: true,
                            marker: true,
                        }}
                    />
                </FeatureGroup>
                <TileLayer

                    url={osm.maptiler.url}
                    attribution={osm.maptiler.attribution}
                />
            </MapContainer>
            {/*<pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre>*/}
        </div>
    )
}

export default MyLeafletMap