import React, {useEffect, useRef, useState, Fragment} from "react";
import Mapbox from "mapbox-gl";
import styled from "styled-components";
import Cosmic from "cosmicjs";
import InfoBox from "../../components/InfoBox";
import Skeleton from "../../components/Skeleton";
import Button from "../../components/Button"

let map = null;
let popUp = null;
let geoData = null;
let secondData = null;



const MapWrapper = styled.div`
    width: 96vw;
    height: 90vh;
    margin: 0 auto;
`

function MapContainer() {
    const mapElement = useRef();

    const [operationsData, setOperationsData] = useState(null);
    const [conflictData, setConflictData] = useState(null);
    const [operationsMarkers, setOperationsMarkers] = useState([])
    const [conflictsMarkers, setConflictsMarkers] = useState([])
    const [isInfo, setIsInfo] = useState(null);
    const [conflictCB, setConflictCB] = useState(true)
    const [operationsCB, setOperationsCB] = useState(true)
    function checkBoxes() {

    }

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
            limit: "20",
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

        if (conflictData !== null) {
 
        map = new Mapbox.Map({
            container: mapElement.current,
            style: 'mapbox://styles/ithinn/ckki1ex630fz317nwvhn811o1',
            zoom: 2,
        })
        .on("load", () => {
            let el;
            //Markers for operations
            if (operationsData !== null) {
                operationsData.objects.map(item => {
                    el = document.createElement('div');
                    el.classList.add("operations-marker")
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
                        <p class="popupDate">Etablert i ${item.metadata.started.slice(0,4)}</p>
                    `)
              
                    setOperationsMarkers(prev => [...prev, new Mapbox.Marker(el).setLngLat([item.metadata.longitude, item.metadata.latitude]).setPopup(popUp).addTo(map)])

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
                    el.classList.add("conflicts-marker")
                    el.style.display = 'block';
                    el.style.width = '30px';
                    el.style.height = '30px';
                    el.style.backgroundImage = `url(${item.metadata.icon_image.url})`;
                    el.style.backgroundSize = 'cover';
                    el.style.backgroundPosition= "center";
                    el.style.borderRadius = "50%";

                    let htmlLegend =  `
                    <h2>${item.title}</h2>
                    <img src=${item.metadata.header_img.url} alt=${item.metadata.alternative_text} />
                    <p><strong>Parter:</strong>${item.metadata.parties}</p>
        
                    <div class="legend-wrapper">
                        <div class="pol-wrapper">
                            <div class="polygon1"></div>
                            <p>${item.metadata.polygon1_text}</p>
                        </div>

                        <div class="pol-wrapper">
                            <div class="polygon2"></div>
                            <p>${item.metadata.polygon2_text}</p>
                        </div>
                    </div>

                    <p>${item.metadata.description}</p>
                    <a target="blank" href=${item.metadata.link}>Les konfliktprofilen</a>
                    `
                    
                    let html = 
                    `
                    <h2>${item.title}</h2>
                    <img src=${item.metadata.header_img.url} alt=${item.metadata.alternative_text} />
                    <p><strong>Parter: </strong>${item.metadata.parties}</p>
                    <p>${item.metadata.description}</p>
                    <a target="blank" href=${item.metadata.link}>Les konfliktprofilen</a>
                    `

                    
                    setConflictsMarkers(prev => [...prev, new ClickableMarker(el).setLngLat([item.metadata.longitude, item.metadata.latitude]).onClick((event) => {
                            
                        if (item.metadata.second_polygon !== "" && item.metadata.second_polygon !== undefined) {
                            document.querySelector(".infowrap").innerHTML = htmlLegend;
                        } else {
                            document.querySelector(".infowrap").innerHTML = html;
                        }
                   
                        setIsInfo(true);

                        map.flyTo({
                            center: [item.metadata.longitude, item.metadata.latitude],
                            zoom: `${item.metadata.zoom_level ? item.metadata.zoom_level : 3}`
                        })


                         console.log(map.getLayer("country"));
                         console.log(map.getLayer("country2"));
                        //removes existing layers and sources if a conflict marker has been clicked earlier
                       
                       
                        if (map.getLayer("country") !== undefined) {
                            map.removeLayer('country');
                            map.removeSource('pol');
                        }

                        if (map.getLayer("country2") !== undefined) {
                            map.removeLayer('country2');
                            map.removeSource('pol2');
                        }
                    
                        geoData = item.metadata.data;
                        secondData = item.metadata.second_polygon;
                   
                        map.addSource("pol", {
                            'type': 'geojson',
                            'data': geoData,
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
   
                        if (item.metadata.second_polygon !== undefined) {
                              
                            map.addSource("pol2", {
                                'type': 'geojson',
                                'data': secondData
                            })
                            .addLayer({
                                id: 'country2',
                                type: 'fill',
                                source: 'pol2',
                                layout: {},
                                paint: {
                                    'fill-color': 'rgba(100, 196, 240, 0.4)',
                                    'fill-outline-color': '#64dbf0'
                                }
                            })  
                        }
                    }).addTo(map)])//set ferdig
                })
            }
        })
    
    map.addControl( new Mapbox.NavigationControl({
        accessToken: process.env.MAPBOX_API_KEY
      }))
    }
    }, [operationsData, conflictData]);
    

    function handleCheckbox(event) {
        let list;

        if (event.target.id === "operations") {
            list = document.querySelectorAll(".operations-marker")
            if (event.target.checked === false) {
                list.forEach(item => {
                  item.style.visibility = "hidden"
                })
                setOperationsCB(false)
            } else {
                list.forEach(item => {
                    item.style.visibility = "visible"
                  })
                setOperationsCB(true);
            }
          
        } else if (event.target.id === "conflicts") {
            list = document.querySelectorAll(".conflicts-marker")   
            if (event.target.checked === false) {
                list.forEach(item => {
                    item.style.visibility = "hidden"
            })
            setConflictCB(false);
            } else {
                list.forEach(item => {
                    item.style.visibility = "visible"
                })
                setConflictCB(true);
            }    
    }}



    function handleCloseIcon(event) {
        console.log(event.target);
        document.querySelector(".infowrap").innerHTML = ""
        setIsInfo(false);

        map.flyTo({
            center: [6.37, 20.56],
            zoom: 2
        })
        
        
        if (map.getLayer("country") !== undefined) {
            map.removeLayer('country');
            map.removeSource('pol');
            
        }

        if (map.getLayer("country2") !== undefined) {
            map.removeLayer('country2');
            map.removeSource('pol2');
        }   
    }

    function renderSkeleton() {
        return(
            <Skeleton 
            width="96vw" 
            height="90vh" 
            widthBox="12em" 
            heightBox="3em" 
            leftBox="2em" 
            topBox="0" 
            marginBox="1em 0">

        </Skeleton>
        )
    }
    
    function renderPage() {
        return(
            <>
                <InfoBox func={handleCheckbox} isInfo={isInfo} handleClose={handleCloseIcon} conflictCB={conflictCB} operationsCB={operationsCB} refreshMap={handleCloseIcon} />
                <MapWrapper ref={mapElement} />
            </>
        )
    }

    return(
        <>
            {(operationsData === null) ? renderSkeleton() : renderPage()}
        </>
    )
}

export default MapContainer;

//
        