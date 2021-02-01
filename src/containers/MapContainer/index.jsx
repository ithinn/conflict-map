import React, {useEffect, useRef, useState, Fragment} from "react";
import Mapbox from "mapbox-gl";
import styled from "styled-components";
import Cosmic from "cosmicjs";
import polygons from "./geodata"
import polygons2 from "../../../data/polygons.json"
//import { IoFileTrayOutline } from "react-icons/io5";

let map = null;
let marker = null;
let popUp = null;
let keys;

let geoData = null;

console.log(polygons[1].features[0].properties.ADMIN);
console.log(polygons2)

const MapWrapper = styled.div`
    width: 96vw;
    height: 500px;
    margin: 0 auto;
`

function MapContainer() {
    const mapElement = useRef();
    const [operationsData, setOperationsData] = useState(null);
    const [conflictData, setConflictData] = useState(null);

    Mapbox.accessToken = process.env.MAPBOX_API_KEY;

    //Get data from Cosmic
    useEffect(() => {

        //UN Peacekeeping operations
        const clientUN = new Cosmic()
        const operations = clientUN.bucket({
            slug: process.env.BUCKET_SLUG,
            read_key: process.env.READ_KEY
        });

        operations.getObjects({
            type: 'conflicts-copy-3667df10-621e-11eb-a47b-456a3acdd925',
            limit: 12,
            props: 'slug,title,metadata',
            sort: 'created_at'
        })
        .then(data => {
            setOperationsData(data);
        })
        .catch(error => {
            console.log(error);
        })

        //Ongoing conflicts
        const clientConflict = new Cosmic()
        const conflicts = clientConflict.bucket({
            slug: process.env.BUCKET_SLUG,
            read_key: process.env.READ_KEY
        });

        conflicts.getObjects({
            type: 'conflicts',
            limit: 12,
            props: 'slug,title,metadata',
            sort: 'created_at'
        })
        .then(data => {
            setConflictData(data);
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    }, []);
    
    
    //Create the map
    useEffect(() => {
        map = new Mapbox.Map({
            container: mapElement.current,
            style: 'mapbox://styles/ithinn/ckki1ex630fz317nwvhn811o1',
            zoom: 1,
        })
        .on("load", () => {
            let el;

            //Markers for operations
            if (operationsData !== null) {
                operationsData.objects.map(item => {
                    el = document.createElement('div');
                    el.style.display = 'block';
                    el.style.width = '30px';
                    el.style.height = '30px';
                    el.style.backgroundImage = `url(${item.metadata.icon_image.url})`;
                    el.style.backgroundSize = 'cover';
                    el.style.backgroundPosition= "center";
                    el.style.borderRadius = "50%";

                    popUp = new Mapbox.Popup({
                        className: 'popup',
                        maxWidth: 'none'
                    });

                    popUp.setHTML(`
                        <img src=${item.metadata.header_img.url} />
                        <h3>${item.title}</h3>
                        <p>${item.metadata.location}</p>
                    `)

                    marker = new Mapbox.Marker(el);
                    marker.setLngLat([item.metadata.longitude, item.metadata.latitude]);
                    marker.setPopup(popUp);
                    marker.addTo(map);

                })
            }

            // Markers for conflicts
            if (conflictData !== null) {

                //Workarount - create markers with click-event class
                class ClickableMarker extends Mapbox.Marker {
                    onClick(handleClick) {
                        this._handleClick = handleClick;
                        return this;
                    }

                    _onMapClick(event) {
                        const targetElement = event.originalEvent.target;
                        const element = this._element;

                        if (this._handleClick && (targetElement === element || element.contains((targetElement)))) {
                            this._handleClick()
                        }
                    }
                };
           
                conflictData.objects.forEach(item => {

                    //styling for custom marker
                    el = document.createElement('div');
                    el.style.display = 'block';
                    el.style.width = '30px';
                    el.style.height = '30px';
                    el.style.backgroundImage = `url(${item.metadata.icon_image.url})`;
                    el.style.backgroundSize = 'cover';
                    el.style.backgroundPosition= "center";
                    el.style.borderRadius = "50%";

                    

                    
                    //new conflict markers with flyTo on onClick. 
                    new ClickableMarker(el)
                        .setLngLat([item.metadata.longitude, item.metadata.latitude])
                        .onClick(() => {
                            map.flyTo({
                                center: [item.metadata.longitude, item.metadata.latitude],
                                zoom: 3
                            })
                            console.log(item.metadata);
                            //removes existing layers and sources if a conflict marker has been clicked on earlier
                            if (geoData !== null) {
                                map.removeLayer('country');
                                map.removeSource('pol');
                            }

                            //finds the right polygon for the conflict marker that has been clicked. 
                            for (let i = 0; i < polygons.length; i++) {
                                if (polygons[i].features[0].properties.ADMIN === item.title) {
                                    geoData = polygons[i]
                                }
                            }
                            
                            map.addSource("pol", {
                                'type': 'geojson',
                                'data': geoData
                            })
                            .addLayer({
                                id: 'country',
                                type: 'fill',
                                source: 'pol',
                                layout: {},
                                paint: {
                                    'fill-color': 'rgba(200, 100, 240, 0.4)',
                                    'fill-outline-color': 'rgba(200, 100, 240, 1)'
                                }
                            })

                                
                            }
                        )
                        .addTo(map)
                })
            }
        })
    }, [operationsData, conflictData]);

   

    function renderSkeleton() {
        return(
            <p>loading</p>
        )
    }
    
    function renderPage() {
        return(<>
            <h2>Test</h2>
           
            
            </>
        )
    }

    return(
        <>
         <MapWrapper ref={mapElement} />
        {(operationsData === null) ? renderSkeleton() : renderPage()}
        </>
    )
}

export default MapContainer;