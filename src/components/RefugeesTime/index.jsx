import React, { useEffect, useState } from "react";
import refugeeData from "../../../data/refugeeData.json";
import Plot from "react-plotly.js";

function RefugeesTime() {


    const [chartState, setChartState] = useState({
        data: [],
        layout: {
            width: 900,
            height: 400,
            title: "Flyktninger",
            paper_bgcolor: "#f9f9f8",
            plot_bgcolor: "#f9f9f8",
            xaxis: {
                title: {
                  text: 'Årstall',
                  type: 'date',
                  font: {
                    family: 'Arial, monospace',
                    size: 15,
                    color: '#7f7f7f'
                  }
                },
            },
            yaxis: {
                title: {
                  text: 'Antall drepte',
    
                  font: {
                    family: 'Arial, monospace',
                    size: 15,
                    color: '#7f7f7f'
                  }
                },
            },
        },

        frames: [],
        config: {
            responsive: true
        }    
    })

    useEffect(() => {
        console.log(refugeeData);

        let traces = []

        //let parsedData = JSON.parse(refugeeData)
        refugeeData.header.forEach(item => {
            console.log(item);
        })
    }, [])

    return(<>
    <Plot
            data={chartState.data}
            layout={chartState.layout}
            frames={chartState.frames}
            config={chartState.config}
            onInitialized={(figure) => setChartState(figure)}
            onUpdate={(figure) => setChartState(figure)} />

    </>)
}

export default RefugeesTime;
