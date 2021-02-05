import React from "react";
import styled, { keyframes } from "styled-components";

export const LoadBase = styled.article`
    width: 56px;
    height: 56px;
    position: absolute;  
    z-index: 7;
`;

export const Box = styled.article`
    border: 8px solid white;
    background: white;
    position:absolute;
    display: block;
`;


const anime1 = keyframes`
    0% {width 56px; height 24px; margin-top 32px; margin-left 0px; }

    12.5% {width 24px; height 24px; margin-top 32px; margin-left 0px;}

    25% {width 24px; height 24px; margin-top 32px; margin-left 0px;} 

    37.5% {width 24px; height 24px; margin-top 32px; margin-left 0px;}

    50% {width 24px; height 24px; margin-top 32px; margin-left 0px;} 

    62.5% {width 24px; height 24px; margin-top 32px; margin-left 0px;}

    75% {width 24px; height 56px; margin-top 0px; margin-left 0px;}

    87.5% {width 24px; height 24px; margin-top 0px; margin-left 0px;}

    100% {width 24px; height 24px; margin-top 0px; margin-left 0px;}
`;

const anime2 = keyframes`

    0% {width 24px; height 24px; margin-top 0px; margin-left 0px;} 
    
    12.5% {width 24px; height 24px; margin-top 0px; margin-left 0px;} 
    
    25% {width 24px; height 24px; margin-top 0px; margin-left 0px;}

    37.5% {width 24px; height 24px; margin-top 0px; margin-left 0px;}
    
    50% {width 56px; height 24px; margin-top 0px; margin-left 0px;}

    62.5% {width 24px; height 24px; margin-top 0px; margin-left 32px;}

    75% {width 24px; height 24px; margin-top 0px; margin-left 32px;}

    87.5% {width 24px; height 24px; margin-top 0px; margin-left 32px;}

    100% {width 24px; height 24px; margin-top 0px; margin-left 32px;}   
`;

const anime3 = keyframes`

0% {width 24px; height 24px; margin-top 0px; margin-left 32px;} 

12.5% {
width 24px;
height 24px;
margin-top 0px;
margin-left 32px;}

25% {
width 24px;
height 56px;
margin-top 0px;
margin-left 32px;}

37.5% {
width 24px;
height 24px;
margin-top 32px;
margin-left 32px;}

50% {
width 24px;
height 24px;
margin-top 32px;
margin-left 32px;
}

62.5% {
width 24px;
height 24px;
margin-top 32px;
margin-left 32px;}

75% {
width 24px;
height 24px;
margin-top 32px;
margin-left 32px;
}

87.5% {
width 24px;
height 24px;
margin-top 32px;
margin-left 32px;
}

100% {
width 56px;
height 24px;
margin-top 32px;
margin-left 0px;}
`

export const Box1 = styled(Box)`
    width: 56px;
    height: 24px;
    margin-top: 32px;
    margin-left: 0;
    animation: ${anime1} 2s 0s ease-in-out forwards infinite;
`;

export const Box2 = styled(Box)`
    width : 24px;
    height: 24px;
    margin-top: 0;
    margin-left: 0;
    animation: ${anime2} 2s 0s ease-in-out forwards infinite;
`

export const Box3 = styled(Box)`
    width : 24px;
    height: 24px;
    margin-top: 0;
    margin-left: 32px;
    border:1px sold yellow;
    animation: ${anime3} 2s 0s ease-in-out forwards infinite;;
  
`;

function LoadSymbol() {
    return (
        <LoadBase>
            <Box1/>
            <Box2/>
            <Box3/>
        </LoadBase>
    )
}

export default LoadSymbol;