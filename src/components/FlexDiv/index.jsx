import styled from "styled-components";
import React from "react";

const FlexDiv = styled.div`

display: flex;
width: ${props => props.width};
height: ${props => props.height};
flex-direction: ${props => props.direction};
margin-bottom: 1em;
font-size: .5rem;
justify-content: ${props => props.justify};
align-items: ${props => props.align}
`

export default FlexDiv