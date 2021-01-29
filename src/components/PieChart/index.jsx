import Plot from "react-plotly.js";

function PieChart( {data} ) {
    return(
        <Plot
    data={data.data}
    layout={data.layout}
    frames={data.frames}
    config={data.config}
    onInitialized={(figure) => setChartState(figure)}
    onUpdate={(figure) => setChartState(figure)}
    />
    )
}

export default PieChart