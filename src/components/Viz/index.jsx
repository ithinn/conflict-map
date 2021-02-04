import React, { useEffect } from "react";
import styled from "styled-components";
import Plot from "react-plotly.js";


function Viz( {chartState} ) {
    
    return(
        <>
            <Plot
            data={chartState.data}
            layout={chartState.layout}
            frames={chartState.frames}
            config={chartState.config}
            onInitialized={(figure) => setChartState(figure)}
            onUpdate={(figure) => setChartState(figure)} />
        </>
        )
}

export default Viz;