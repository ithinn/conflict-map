import React from "react";
import styled from "styled-components";
import BattleDeaths from "../BattleDeaths"
import RefugeesTime from "../RefugeesTime"
import { ImCircleDown } from "react-icons/im";
import { IconContext } from "react-icons/lib";
//import { IconContext } from "react-icons/lib";

const VizWrapperBase = styled.section`
width: 100%;
height: 100vh;
background: #f9f9f8;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
padding: 2em;

`
function handleClickArrow(event) {
   /* scrollToComponent(secondViz, {
        duration: 1500
    }
    )*/

    console.log("klikk")
}

function VizWrapper( {name} ) {
    return(
        <VizWrapperBase>
            {name === "BattleDeaths" ? <BattleDeaths/> : <RefugeesTime/>}
            <IconContext.Provider value={{size: "2rem"}}>
                <ImCircleDown onClick={handleClickArrow}/>
            </IconContext.Provider>
        </VizWrapperBase>
    )
}

export default VizWrapper;
