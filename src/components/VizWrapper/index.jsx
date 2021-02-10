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
            setSourceData(data.objects)
        })
        .catch(error => {

        })
        
    }, [])

    return(
        <VizWrapperBase id={id}>
            {comp}
            <SourceBox id={id}/>
        </VizWrapperBase>
    )
}

export default VizWrapper;

