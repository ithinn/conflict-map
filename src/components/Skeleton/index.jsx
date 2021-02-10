import React from "react";
import LoadSymbol from "../Skeleton/styled-components/LoadSymbol";
import SkeletonBase from "../Skeleton/styled-components/SkeletonBase";
import SkeletonBox from "../Skeleton/styled-components/SkeletonBox";

function Skeleton() {
    return(
        <SkeletonBase >
            <SkeletonBox />
            <LoadSymbol />
        </SkeletonBase>
    )
}

export default Skeleton;