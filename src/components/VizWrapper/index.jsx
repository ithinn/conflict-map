import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cosmic from "cosmicjs";
import SourceBox from "../SourceBox";

const VizWrapperBase = styled.section`
width: 100%;
height: 90vh;
background: #f9f9f8;
margin-top: 3em;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
scroll-snap-align: center;
`



function VizWrapper( {comp, id, index } ) {

    const [sourceData, setSourceData] = useState(null)
    const [refCB, setRefCB] = useState(false);
    const [deathsCB, setDeathsCB] = useState(false);

    useEffect(() => {
        const client = new Cosmic()
        const source = client.bucket({
            slug: process.env.BUCKET_SLUG,
            read_key: process.env.READ_KEY
        });
    
        source.getObjects({
            type: 'sources',
            limit: 10,
            props: 'slug,title,content,metadata'
        })
        .then(data => {
            console.log(data);
            setSourceData(data.objects)
        })
        .catch(error => {
            console.log(error);
        })
        
    }, [])

    function handleCBClick(event) {
        console.log("checkbox: " + event.target.id)
        if (event.target.id === "cbrefugeesFrom") {
            setRefCB(event.target.checked)
        } else {
            setDeathsCB(event.target.checked);
        }

    }
    if (sourceData !== null) {
        console.log(sourceData[index].content);
    }


    return(
        <VizWrapperBase id={id}>
            {comp}
      
            <SourceBox id={id}/>
            
           
        </VizWrapperBase>
    )
}

export default VizWrapper;

// <SourceBox refCB={refCB} deathsCB={deathsCB} componentId={id} index={index} data={sourceData} handleClick={handleCBClick}/>



/*
<a href={id === "battleDeaths" ? "#RefugeesFrom" : "#battleDeaths"}>
                <IconContext.Provider value={{size: "3rem"}}>
                    <ImCircleDown onClick={func}/>
                </IconContext.Provider>
            </a>*/