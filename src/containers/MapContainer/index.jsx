import React, {useEffect, useRef, useState, Fragment} from "react";
import Mapbox from "mapbox-gl";
import styled from "styled-components";
import Cosmic from "cosmicjs";

let map = null;
let marker = null;
let popUp = null;

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
        })
        .catch(error => {
            console.log(error);
        })
    }, []);
    
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

                conflictData.objects.map((item, index) => {
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
                        maxWidth: 'none',
                        offset: [-27, 198]
                    });
                    
                    popUp.setHTML(`
                    <img src=${item.metadata.header_img.url} />
                    <h3>${item.title}</h3>
                    <p>${item.metadata.location}</p>
                    <p>Parter: ${item.metadata.parties}</p>
                    <p>${item.metadata.description}</p>
                    <a href=${item.metadata.link}>Les konfliktprofilen</a>
                    `);
                  
                    marker = new Mapbox.Marker(el);
                    marker.setLngLat([item.metadata.longitude, item.metadata.latitude]);
                    marker.setPopup(popUp);
                    marker.addTo(map);
                });
            }
        })//on.load
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