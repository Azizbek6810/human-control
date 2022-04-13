import {Polygon} from "react-yandex-maps";
import {useCallback, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";

function MyPolygon({polygon}) {

    const [drawPolygon, setDrawPolygon] = useState([])
    const [formValues, setFormValues] = useState('');

    const draw = useCallback((ref: any) => {
        if (ref) {
            ref.editor.startDrawing();
            ref.geometry.events.add('change', (e: any) => setDrawPolygon(e.get('newCoordinates')));
        }
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
    };

    // const balloonContent = [<>
    //     <form onSubmit={handleSubmit}>
    //         <Grid container alignItems="center" justify="center" direction="column">
    //             <Grid item>
    //                 <TextField
    //                     id="name-input"
    //                     name="name"
    //                     label="Name"
    //                     type="text"
    //                     value={formValues.name}
    //                     onChange={handleInputChange}
    //                 />
    //             </Grid>
    //             <Button variant="contained" color="primary" type="submit">
    //                 Submit
    //             </Button>
    //         </Grid>
    //     </form>
    // </>]

    const Button = () => (
        <button onClick={() => alert("адрес")}>показать адрес</button>
    );

    const BalloonContent = () => {
        const portalRoot = document.querySelector(".portal");
        const portalContainer = document.createElement("div");
        useEffect(() => {
            portalRoot.appendChild(portalContainer);
        }, [portalContainer, portalRoot]);

        return ReactDOM.createPortal(<Button/>, portalContainer);
    };
    const [open, setOpen] = useState(false);

    console.log(drawPolygon[0], 'drawPolygon')
    return (
        <div>
            {polygon && <Polygon
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                instanceRef={ref => draw(ref)}
                geometry={drawPolygon}
                onBalloonOpen={() => setOpen(true)}
                onBalloonClose={() => setOpen(false)}
                onClick={e =>
                    e.originalEvent.target.options.set("fillColor", "#00AF00")
                }
                properties={{
                    balloonContent: `<div class="portal"></div>`,
                    // balloonContent
                    //     <form onSubmit={handleSubmit}>
                    //         <Grid container alignItems="center" justify="center" direction="column">
                    //             <Grid item>
                    //                 <TextField
                    //                     id="name-input"
                    //                     name="name"
                    //                     label="Name"
                    //                     type="text"
                    //                     value={formValues.name}
                    //                     onChange={handleInputChange}
                    //                 />
                    //             </Grid>
                    //             <Button variant="contained" color="primary" type="submit">
                    //                 Submit
                    //             </Button>
                    //         </Grid>
                    //     </form>

                    hintContent: "polygon"
                }}
                options={{
                    editorDrawingCursor: 'green',
                    editorMinPoints: 4,
                    fillColor: '#00FF00',
                    strokeColor: '#0000FF',
                    opacity: 0.8,
                    strokeWidth: 5,
                }}/>}
            {open && <BalloonContent/>}
        </div>
    )
}

export default MyPolygon