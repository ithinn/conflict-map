import React from "react";
import styled, { keyframes } from "styled-components";

const SkeletonBox = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    position: absolute;
    z-index: 5;
    background: #ebebea;
    top: ${props => props.top};
    margin: ${props => props.margin};
    left: ${props => props.left};
    /*box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.42);*/
`

export default SkeletonBox;