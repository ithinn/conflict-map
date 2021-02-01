import React, {useEffect, useRef, useState, Fragment} from "react";
import Mapbox from "mapbox-gl";
import styled from "styled-components";
import Cosmic from "cosmicjs";
import Button from "../../components/Button";
import FlexDiv from "../../components/FlexDiv";
import { IoBluetooth, IoLocationOutline } from "react-icons/io5";
import conflictSymbol from "../../img/conflict_icons/icon_bck_gray.png"

let map = null;
let marker = null;
let popUp;

const MapWrapper = styled.div`
    width: 96vw;
    height: 500px;
    margin: 0 auto;
`

function MapContainer() {
    const mapElement = useRef(); //Reference to the div that contains the map
    const popupImg = useRef();
    const operInput = useRef();
    const confInput = useRef();
    
    const [operationsData, setOperationsData] = useState(null);
    const [conflictData, setConflictData] = useState(null);
    const [operCheck, setOperCheck] = useState(true)
    const [confCheck, setConfCheck] = useState(true)
    const [chartState, setChartState] = useState({
        data: [
        ], 
        layout: {
          width: 200,
          height: 200,
          title: "Fordeling",
         showlegend: false,
        },
        frames: [], 
        config: {}
      });

    Mapbox.accessToken = process.env.MAPBOX_API_KEY

    
    useEffect(() => {
        map = new Mapbox.Map({
            container: mapElement.current,
            style: 'mapbox://styles/ithinn/ckki1ex630fz317nwvhn811o1',
            zoom: 1,
        })
        //.on("click", event => handleClick(event))
    
     /* 
        Tester å sette inn polygon
        .on('load', () => {
            map.addSource('afghanistan', {
                type: 'geojson',
                data: geoJson
            })

            map.addLayer({
                id: 'afghanistan-layer',
                type: 'fill',
                source: 'afghanistan',
                layout: {},
                paint: {
                    'fill-color': '#593131',
                    'fill-opacity': 0.6
    
                }
            })
        })*/

        map.addControl(
            new Mapbox.NavigationControl({
              accessToken: process.env.MAPBOX_API_KEY
            }),
            'top-left'
          );

    }, []);


    useEffect(() => {
         //HENTER DATA FRA COSMIC
        //Operasjoner
         const client = new Cosmic()
         const operations = client.bucket({
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
                console.log(data.objects)
                 setOperationsData(data);
             })
             .catch(error => {
                 console.log(error);
             })

         //Konflikter    
         const client2 = new Cosmic()
         const conflicts = client2.bucket({
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
                 setConflictData(data)
                 
                 
             })
             .catch(error => {
                 console.log(error);
             })
    }, []);


    //Skriver ut markører etter at pageData er satt
    useEffect(() => {

        let el; 
        let popupArticle;
        let newChartData = null;

        if (operationsData !== null && operCheck === true) {
          
            operationsData.objects.map((item, index) => {

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
               
                
                `);
                marker = new Mapbox.Marker(el);
                marker.setLngLat([item.metadata.longitude, item.metadata.latitude]);
                marker.setPopup(popUp);
                marker.addTo(map);

            
                
            })
            
        }
/*
        if (conflictData !== null) {

            let mappedFeatures =  conflictData.objects.map(item => {
                 return {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [
                            item.metadata.longitude,
                            item.metadata.latitude
                        ]
                    }
                    }
                });           
            
        console.log(mappedFeatures);    

            map.on("load", () => {
                //Add image to use as a custom marker
                map.loadImage(
                    conflictSymbol, function (error, image) {
                        if (error) throw error;
                        map.addImage("custom-marker", image);

                        //Add a GeoJson source

                        map.addSource('points', {
                            'type': 'geojson',
                            'data': {
                                'type': "FeatureCollection",
                                'features': [ mappedFeatures
                                ]
                            }
                        });

                        //Add a symbol layer
                        map.addLayer({
                            'id': 'symbols',
                            'type': 'symbol',
                            'source': 'points',
                            'layout': {
                                'icon-image': 'custom-marker'
                            }
                        });
                    }
                );



                //Center the map on the coordinates of any clicked symbol from the "symbols" layer
                map.on('click', 'symbols', function (event) {
                    map.flyTo({
                        center: event.features[0].geometry.coordinates
                    });
                });
            });


            //Change the cursor to a pointer when it enters a feature in the symbols layer
            map.on("mouseenter", "symbols", function () {
                map.getCanvas().style.cursor = "pointer";
            });

            //Change it back to a pointer when it leaves
            map.on("mouseleave", "symbols", function () {
                map.getCanvas().style.cursor = "";
            });



        }

        */


       // DETTE VIRKER I OG FOR SEG
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
                //el.addEventListener("click", event => testFunction(event));

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
                //marker.getElement().addEventListener("click", event => testFunction(event))
                marker.addTo(map);
        })}
    }, [operationsData, operCheck]);

    
    const testFunction = event => {
        console.log(event.target);
    } 
    //Jeg vil at sjekkboksen skal styre om operasjonene vises eller ikke. 
    const toggleChecked = ( {target} ) => {
        console.log(target.checked);
        if (target.checked === true) {
            setOperCheck(true)
        } else if (target.checked === false) {
            setOperCheck(false);
        }
    }

    //Jeg vil klikke på markøren og flyto, OG vise polygonen
    const handleClick = event => {
        console.log(event.lngLat);
       /* map.flyTo({
            center: event.lngLat,
            zoom: 4
        })*/
    }
        
    return(
        <main>

            <FlexDiv width="80%" height="auto" direction="row">
                <label htmlFor="conf">Konflikter</label>
                <input ref={confInput} type="checkbox" id="conf"></input>
                <label htmlFor="oper">FNs fredsoperasjoner</label>
                <input ref={operInput} type="checkbox" id="oper" onClick={toggleChecked} ></input>
            </FlexDiv>
            <MapWrapper ref={mapElement} />
        </main>
        
    )
}

export default MapContainer;


               
               /*
               FORSØK PÅ Å SETTE STATE FOR PAI-DIAGRAMMET
                newChartData = 
                [{
                    values: [item.metadata.data.total_military_personell, item.metadata.data.total_civilian_personell,],
                    labels: ['Militært personell', 'Sivilt personell'],
                    type: 'pie'
                }]

                let newChartState = {
                    ...chartState,
                    data: [newChartData]
                };

                setChartState(newChartState);*/