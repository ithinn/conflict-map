import React from "react";
import styled from "styled-components";


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


function VizWrapper( {comp, id } ) {

    return(
        <VizWrapperBase id={id}>
            {comp}
        </VizWrapperBase>
    )
}

export default VizWrapper;





/*
<a href={id === "battleDeaths" ? "#RefugeesFrom" : "#battleDeaths"}>
                <IconContext.Provider value={{size: "3rem"}}>
                    <ImCircleDown onClick={func}/>
                </IconContext.Provider>
            </a>*/