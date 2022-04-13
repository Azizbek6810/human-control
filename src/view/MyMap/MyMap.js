import React, {useCallback, useEffect, useRef, useState} from 'react';
import {GoogleMap, withGoogleMap, withScriptjs, Polygon, Circle, InfoWindow} from "react-google-maps";
import {apiKey} from "../../store/config";
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";
import {useDispatch, useSelector} from "react-redux";
import {getLocation} from "../../store/location/location";
import {Base64} from "js-base64";
import {Button, FormControl, FormHelperText, Input, InputLabel, TextField} from "@mui/material";
import Sidebar from "../../Component/sidebar/Sidebar";


function Map() {

    const [coordinates, setCoordinates] = useState([])
    const [circleCenter, setCircleCenter] = useState([])
    const [circleRadius, setCircleRadius] = useState([])
    const [position, setPosition] = useState(null)
    const [handleOpen, setHandleOpen] = useState(false)
    const [textValue, setTextValue] = useState("");
    const dispatch = useDispatch()
    const [profile, setProfile] = useState(localStorage.getItem('Authority') ? JSON.parse(Base64.decode(localStorage.getItem('Authority'))) : "");
    const {locationData, data} = useSelector(state => state.location)
    useEffect(() => {
        dispatch(getLocation(profile.data.userId))
    }, [profile])


    const getPaths = (e) => {
        // console.log(e.overlay.getPath().getArray().map(value => {
        //     return {
        //         lat: value.lat()
        //     }
        // }), 'qwerty')
        switch (e.type) {
            case "polygon":
                const coords = e.overlay
                    .getPath()
                    .getArray()
                    .map((value) => {
                        return {
                            lat: value.lat(),
                            lng: value.lng(),
                        };
                    });
                setCoordinates([...coordinates, coords])
                break;
            case "circle":
                setCircleCenter([{
                    lat: e.overlay.getCenter().lat(),
                    lng: e.overlay.getCenter().lng()
                }])
                setCircleRadius(e.overlay.getRadius())
                break;
        }
    }


    const handleSubmit = () => {
        console.log(textValue)
        setHandleOpen(false)
    }

    const handlePolygonOpen = (i) => {
        setTextValue('')
        coordinates[0].map(a => {
            setPosition(a)
        })
        setHandleOpen(true)
    }
    const handleCircle = (i) => {
        debugger
        console.log("dfghjk")
        setTextValue('')
        setHandleOpen(true)
        circleCenter.map(a => {
            setPosition(a)
        })
    }
    const handleToggleClose = () => {
        setHandleOpen(false)
    }

    const onTextChange = (e) => {
        setTextValue(e.target.value)
    }

    return (
        <GoogleMap
            defaultCenter={{lat: 41.370288834533895, lng: 69.21512673600849}}
            defaultZoom={15}
        >

            {handleOpen ?
                <InfoWindow
                    position={{lat: position.lat, lng: position.lng}}
                    onCloseClick={() => handleToggleClose()}>
                    <div>
                        <FormControl>
                            <TextField
                                onChange={onTextChange}
                                id="my-helper-text"
                                value={textValue}
                                fullWidth
                            />
                            <FormHelperText id="my-helper-text">We'll never share your information.</FormHelperText>
                            <Button onClick={handleSubmit} variant="contained">Submit</Button>
                        </FormControl>
                    </div>
                </InfoWindow> : null}
            <DrawingManager
                onOverlayComplete={function (e) {
                    getPaths(e)
                }}
                defaultOptions={{
                    drawingControl: true,
                    drawingControlOptions: {
                        position: window.google.maps.ControlPosition.TOP_CENTER,
                        draggable: false,
                        drawingModes: [
                            window.google.maps.drawing.OverlayType.CIRCLE,
                            window.google.maps.drawing.OverlayType.POLYGON
                        ]
                    },
                    polygonOptions: {
                        clickable: true,
                        draggable: false,
                        editable: true,
                        strokeColor: "#043b74",
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                        fillColor: "#043b74",
                        fillOpacity: 0.35,
                    },
                    circleOptions: {
                        fillColor: `#f63030`,
                        fillOpacity: 0.5,
                        strokeWeight: 5,
                        clickable: true,
                        editable: true,
                        draggable: false,
                    },
                }}
            />

            <Polygon
                path={coordinates}
                draggable={false}
                editable={false}
                onClick={(i) => handlePolygonOpen(i)}
                options={{
                    strokeColor: "#ff4c4c",
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                    fillColor: "#ff4c4c",
                    fillOpacity: 0.35
                }}
            >
            </Polygon>
            <Circle
                onClick={(event) => {
                    console.log("click");
                }}
                onCenterChanged={(event) => {
                    alert('dfg')
                }}
                defaultCenter={{
                    lat: parseFloat(circleCenter[0]),
                    lng: parseFloat(circleCenter[0])
                }}
                defaultRadius={parseFloat(circleRadius)}
                defaultDraggable={false}
                editable={false}
            />
            {locationData && locationData.resCirclePolygons.map(item => {
                return <Circle
                    center={{lat: item.lat, lng: item.lon}}
                    radius={item.radius}
                    options={{
                        strokeColor: "#ff4c4c",
                        strokeOpacity: 0.8,
                        strokeWeight: 4,
                        fillColor: "#ff4c4c",
                        fillOpacity: 0.35
                    }}
                />
            })
            }

        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

function MyMap() {

    return (
        <div>
            <WrappedMap
                containerElement={<div style={{width: "100%", height: "100vh", float: "right"}}/>}
                mapElement={<div style={{height: "100vh"}}/>}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
                loadingElement={<div style={{height: "100vh"}}/>}
            />

        </div>
    );
}
;

export default MyMap
