import React from "react";
import styled from "styled-components";
import LoadSymbol from "../Skeleton/styled-components/LoadSymbol";
import SkeletonBase from "../Skeleton/styled-components/SkeletonBase";
import SkeletonBox from "../Skeleton/styled-components/SkeletonBox";

function Skeleton( { width, height, widthBox, heightBox, leftBox, topBox, marginBox }) {
    return(
        <SkeletonBase width={width} height={height}>
            <SkeletonBox width ={widthBox} height={heightBox} />
            <LoadSymbol />
        </SkeletonBase>
    )
}

export default Skeleton;