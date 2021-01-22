import React, {useEffect, useRef, useState, Fragment} from "react";
import Mapbox from "mapbox-gl";
import styled from "styled-components";
import Cosmic from "cosmicjs";
//import PopupImg from "../../components/PopupImg";
import { NoEmitOnErrorsPlugin } from "webpack";
import { IoLocationOutline } from "react-icons/io5";
//import "../../../data/coredata_activepkomissions.json";
import coreData, {dec2020Data} from "./data";

const MapWrapper = styled.div`
    width: 96vw;
    height: 500px;
    margin: 0 auto;
`

function MapContainer() {
    const mapElement = useRef(); //Reference to the div that contains the map
    const popupImg = useRef();
    
    let marker;
    let popUp;
    const [mapState, setMapState] = useState(null);
    const [pageData, setPageData] = useState(null);
    //const [coreData, setCoreData] = useState(null);

    Mapbox.accessToken = process.env.MAPBOX_API_KEY

    useEffect(() => {
        let map = new Mapbox.Map({
            container: mapElement.current,
            style: 'mapbox://styled/mapbox/navigation-guidance-night-v4',
            zoom: 1,
        });
        
        map.addControl(
            new Mapbox.NavigationControl({
              accessToken: process.env.MAPBOX_API_KEY
            }),
            'top-left'
          );

        setMapState(map);
    }, []);


    useEffect(() => {
         //HENTER DATA FRA COSMIC
        
         const client = new Cosmic()
         const bucket = client.bucket({
             slug: process.env.BUCKET_SLUG,
             read_key: process.env.READ_KEY
         });
 
         bucket.getObjects({
             type: 'operations',
             limit: 12,
             props: 'slug,title,metadata',
             sort: 'created_at'
         })
             .then(data => {
                 
                 setPageData(data);
             })
             .catch(error => {
                 console.log(error);
             })

        
       

    }, [mapState]);



    //Skriver ut markører etter at pageData er satt
    useEffect(() => {

        
        if (pageData !== null) {
            console.log(pageData.objects);

            pageData.objects.map((item, index) => {
                popUp = new Mapbox.Popup({
                    className: 'popup',
                    maxWidth: 'none'
                });
                popUp.setHTML(`
                <img src=${item.metadata.header_image.url} />
                <h3>${item.title}</h3>
                <p>${item.metadata.location}</p>
                <p>Sivilt personell: ${item.metadata.civilian_personell}</p>
                <p>Militært personell: ${item.metadata.military_personell}</p>
                <p>Totalt personell: ${item.metadata.total_personell}</p>
                <p>Dødsfall: ${item.metadata.fatalities}</p>
                
                
                <p>(Desember 2020)</p>
                
                `);
                marker = new Mapbox.Marker();
                marker.setLngLat([item.metadata.longitude, item.metadata.latitude]);
                marker.setPopup(popUp);
                marker.addTo(mapState);
            })

/* Denne virker i seg selv
            pageData.objects.map(item => {
                
            })*/
        }
        
     
    }, [pageData]);

    console.log(coreData);
    console.log(dec2020Data);


  
 
  
    return(
        <main>
            
            <MapWrapper ref={mapElement} />
        </main>
        
    )
}

export default MapContainer;