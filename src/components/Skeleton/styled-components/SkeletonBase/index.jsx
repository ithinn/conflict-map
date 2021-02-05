import React from "react";
import styled from "styled-components";

const SkeletonBase = styled.article`
    background: lightgray;
    width: ${props => props.width};
    height: ${props => props.height};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export default SkeletonBase;