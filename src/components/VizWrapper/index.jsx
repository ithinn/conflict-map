import React from "react";
import styled from "styled-components";
import BattleDeaths from "../BattleDeaths"
import RefugeesTime from "../RefugeesTime"
import { ImCircleDown } from "react-icons/im";
import { IconContext } from "react-icons/lib";
//import { IconContext } from "react-icons/lib";

const VizWrapperBase = styled.section`
width: 100%;
height: 90vh;
background: #f9f9f8;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;

scroll-snap-align: center;
border: 1px solid red;

`


function VizWrapper( {func, comp, id} ) {
    return(
        <VizWrapperBase>
            {comp}
            <a href={id}>
                <IconContext.Provider value={{size: "2rem"}}>
                    <ImCircleDown onClick={func}/>
                </IconContext.Provider>
            </a>
        </VizWrapperBase>
    )
}

export default VizWrapper;
