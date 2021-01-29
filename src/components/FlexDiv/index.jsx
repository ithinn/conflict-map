import styled from "styled-components";
import React from "react";

const FlexDiv = styled.div`

display: flex;
width: ${props => props.width};
height: ${props => props.height};
flex-direction: ${props => props.direction};
margin-bottom: 1em;
`

/*
function FlexDiv( {width, height, direction}) {

    return(
        <FlexBase style={{height: height}, {width: width}, {flexDirection: direction}}></FlexBase>
    )
}*/


export default FlexDiv