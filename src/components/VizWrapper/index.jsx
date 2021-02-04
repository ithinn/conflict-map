import React from "react";
import styled from "styled-components";
import Viz from "../../components/Viz"
import { ImCircleDown } from "react-icons/im";
//import { IconContext } from "react-icons/lib";

const VizWrapperBase = styled.section`
width: 100%;
height: 100vh;
background: #f9f9f8;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;

`


function VizWrapper({chartState}) {
    return(
        <VizWrapperBase>
            <Viz chartState={chartState}/>
        
            <div>
            <ImCircleDown />
            </div>
            
   
        </VizWrapperBase>
    )
}

export default VizWrapper;
