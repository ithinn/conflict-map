import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Plot from "react-plotly.js";

let colorList = [];

const onlyYearUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function BattleDeaths() {

    const [chartState, setChartState] = useState({
        data: [],
        layout: {},
        frames: [],
        config: {
            responsive: true
        }    
    })

    //Stacked bar - Battle deaths
    useEffect(() => {
        let traces = [];
        
        fetch('https://ucdpapi.pcr.uu.se/api/battledeaths/20.1?pagesize=1636&page=1')
        .then(response => {
          return response.json()
        })
        .then(data => {
      
          //Oppretter objekt for hver battle_location og lagrer det i traces
          data.Result.forEach(item => {
            colorList.push(getRandomColor())


            traces.push({
              x: [],
              y: [],
              text: "fdsf",
              name: item.battle_location,
              type: 'bar',
              hovertemplate: " Antall drepte: %{y} (%{x})" 

            })
            });
    
          //Pusher riktige år inn i x-arrayet til riktig trace-objekt, og sorterer kun unike år-verdier.  
          for (let i=0; i<data.Result.length; i++) {
            for (let j=0; j<traces.length; j++) {
              if (traces[j].name === data.Result[i].battle_location) {
                traces[j].x.push(data.Result[i].year);
                traces[j].x = traces[j].x.filter(onlyYearUnique);  
              }
            }
          }
    
          //Pusher en "null" inn i y for hvert item i x-arrayet
          for (let i = 0; i < traces.length; i++) {
            for(let j = 0; j < traces[i].x.length; j++) {
              traces[i].y.push(null);
            }
          }
    
          //Erstatter "null" med bd_best i y-arrayet
          for (let i = 0; i < data.Result.length; i++) {
            
            for(let j = 0; j < traces.length; j++) {
    
              for (let k = 0; k < traces[j].x.length; k++) {
    
                if (traces[j].name === data.Result[i].battle_location && traces[j].x[k] === data.Result[i].year) {
                  traces[j].y[k] === null ? traces[j].y[k] = Number(data.Result[i].bd_best) : traces[j].y[k] = Number(traces[j].y[k]) + Number(data.Result[i].bd_best);
                }
              }
            }
          }
    
          const withoutDuplicates = Array.from(new Set(traces.map(a => a.name))).map(name => {
            return traces.find(a => a.name === name);
          })
  

          let layout = {
            width: 900,
            height: 400,
            title: "Antall drepte i konflikter",
            legend: {
                'title': {
                'text': "Parter i konfliktene:",
                'side': "top",
                'x': "0.75",
                'xanchor': "right",
                'font': {
                  'family': 'Roboto, sans-serif',
                  'size': '15'
                }
                }
            },
            colorway: colorList,
            hovermode: 'closest',
            hoverlabel: {
                'font': {
                  'family': "Times New Roman",
                  'size': 10,
                  'font': "#333333",
                },    
            },
            barmode: 'stack',
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
        };
    
          //Forbereder oppdatering av state
          let newChartState = {
            ...chartState, 
            data: [...withoutDuplicates],
            layout: layout,
          };
     
          //Setter state med dataen vi har hentet ut. 
          setChartState(newChartState) 
        })
        .catch(error => {
          console.log(error)
          alert("Serveren er ødelagt, bare vent litt");
        })
      }, [])
    
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

export default BattleDeaths;



      