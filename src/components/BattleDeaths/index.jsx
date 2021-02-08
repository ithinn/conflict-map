import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Plot from "react-plotly.js";
import Skeleton from "../Skeleton/";
import Error from "../Error";

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

    const [chartState, setChartState] = useState(null)

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

        //  width: 750,
         // height: 320,
  

          let layout = {
            autosize: true,
            margin: {
              'l': 100,
              'b': 80,
              't': 80,
              'r': 100,
            },

            pad: 20,
            title: {
              text: "Antall drepte i konflikter",
              font: {
                'family': "Arial",
                'size': "35",
    
              }
            },
            legend: {
                'title': {
                'text': "Parter i konfliktene:",
                'side': "top",
                'x': "0.75",
                'xanchor': "right",
                'font': {
                  'family': 'Arial, sans-serif',
                  'size': '20'
                }
                },
              'font': {
                'size': '15',
                'family': "Arial, sans-serif",
              } 
            },
            colorway: colorList,
            hovermode: 'closest',
            hoverlabel: {
                'font': {
                  'family': "Arial",
                  'size': 15,
                  'font': "#333333",
                },    
            },
            barmode: 'stack',
            paper_bgcolor: '#f9f9f8',
            plot_bgcolor: '#f9f9f8',
            xaxis: {
                title: {
                  text: 'Årstall',
                  type: 'date',
                  font: {
                    family: 'Arial',
                    size: 15,
                    color: '#7f7f7f'
                  }
                },
                tickfont: {
                  size: 15,
                },
 
            },
            yaxis: {
                title: {
                  text: 'Antall drepte',
                  font: {
                    family: 'Arial',
                    size: 15,
                    color: '#7f7f7f'
                  }
                },
                tickfont: {
                  size: 15,
                },
               // autorange: true,
            },
        };
    
          //Forbereder oppdatering av state
          let newChartState = {
            //...chartState, 
            data: [...withoutDuplicates],
            layout: layout,
            frames: [],
            config: {
              responsive: true
            } 
          };
     
          //Setter state med dataen vi har hentet ut. 
          setChartState(newChartState) 
        })
        .catch(error => {
          renderError();
          alert("En serverfeil gjør at dataen ikke kan lastes inn. Prøv igjen om litt.")
          console.log(error);
        })
      }, [])
    
    function renderSkeleton() {
  
      return( 
        <Skeleton
          width="96vw" 
          height="100vh" 
          widthBox="70%" 
          heightBox="70vh" 
         />
      )
    } 

    function renderPage() {
      return(

        <>
            <Plot
            useResizeHandler
            style={{width: "100%"}}
            data={chartState.data}
            layout={chartState.layout}
            frames={chartState.frames}
            config={chartState.config}
            onInitialized={(figure) => setChartState(figure)}
            onUpdate={(figure) => setChartState(figure)} />
        </>
        )
    }

    function renderError() {
      return(
        <Error/>
      )
    }

    return(
        <>
        {(chartState === null) ? renderSkeleton() : renderPage()}
          
          
        </>
        )
}

export default BattleDeaths;
//


      