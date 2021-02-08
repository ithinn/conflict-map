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
margin-top: 3em;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
scroll-snap-align: center;

`


function VizWrapper( {func, comp, id, height} ) {

   

    return(
        <VizWrapperBase id={id}>
            {comp}
            
        </VizWrapperBase>
    )
}

export default VizWrapper;
/*
<a href={id === "battleDeaths" ? "#refugeesTime" : "#battleDeaths"}>
                <IconContext.Provider value={{size: "3rem"}}>
                    <ImCircleDown onClick={func}/>
                </IconContext.Provider>
            </a>*/