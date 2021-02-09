import React from "react";
import styled from "styled-components";

const SkeletonBase = styled.article`
    background: lightgray;
    width: 96vw;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default SkeletonBase;