import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Skeleton from "../Skeleton/";
import Error from "../Error";
import colorList from "../../colorList";


//Sorts out all duplicate values - used to filter arrays
const onlyYearUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}


function BattleDeaths() {

  const [chartState, setChartState] = useState(null)
  const [error, setError] = useState(false);
   

  //Fetch data from the Uppsala University API
  useEffect(() => {
    let traces = [];
      
    fetch('https://ucdpapi.pcr.uu.se/api/battledeaths/20.1?pagesize=1636&page=1')
    .then(response => {
      return response.json()
    })
    .then(data => {
    
      //Creates an object for each location_inc in the data and saves it in traces.
      //Pushes a random color for each object into colorlist. 
      data.Result.forEach(item => {
     
        traces.push({
          x: [],
          y: [],
          name: item.location_inc,
          type: 'bar',
          hoverinfo: "y+text",
          hovertext: [],
        })
      });
    
      //Pushes the corresponding "year" into each trace's x-array. 
      //Filters out all duplicate years, so that all the year items in x-array are unique.  
      for (let i=0; i<data.Result.length; i++) {
        for (let j=0; j<traces.length; j++) {
          if (traces[j].name === data.Result[i].location_inc) {
            traces[j].x.push(data.Result[i].year);
            traces[j].x = traces[j].x.filter(onlyYearUnique);  
          }
        }
      }
    
      //Pushes a "null" into the y-array for every item in the x-array
      for (let i = 0; i < traces.length; i++) {
        for(let j = 0; j < traces[i].x.length; j++) {
          traces[i].y.push(null);
        }
      }

      for (let i = 0; i < traces.length; i++) {
        for(let j = 0; j < traces[i].x.length; j++) {
          traces[i].hovertext.push(null);
        }
      }
    
      //Loops through all data, the trace-array and each trace's x-array. 
      //Pushes bd_best into the right index in the y-array, based on which year the data contains. 
      //Pushes location_inc into the right index in the hovertext-array.
      //(If a battle took place in 1996, the bd_best value is pushed in the y-array on the same index as the year "1996" in the x-array)
      //If that index already have a value from an earlier iteration, the new value is added to the old. 

      for (let i = 0; i < data.Result.length; i++) {
            
        for(let j = 0; j < traces.length; j++) {
    
          for (let k = 0; k < traces[j].x.length; k++) {
                
            if (traces[j].name === data.Result[i].location_inc && traces[j].x[k] === data.Result[i].year) {
              traces[j].y[k] === null ? traces[j].y[k] = Number(data.Result[i].bd_best) : traces[j].y[k] = Number(traces[j].y[k]) + Number(data.Result[i].bd_best);
              traces[j].hovertext[k] = "ble drept i konflikten i " + data.Result[i].location_inc + " i " + traces[j].x[k];
            }
          }
        }
      }
          

        //There can be several traces with the same "name" (battle locations).
        //This creates a new array where all the duplicates are removed.
        //We now have one array with one trace for each battle location. 
        //Each trace have an x-array with unique years where the battles took place, and an y-array that stores the number of fatalities for each year. 
          
        const withoutDuplicates = Array.from(new Set(traces.map(a => a.name))).map(name => {
          return traces.find(a => a.name === name);
        })

      
        //Sets the layout of the chart
        let layout = {
          autosize: true,
          margin: {
            'l': 100,
            'b': 100,
            't': 100,
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
            'text': "Konflikt: ",
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
          },
      };
    
      //Saves "withoutDuplicates" and "layout", and sets responsive to true, in a new variable
      let newChartState = { 
        data: [...withoutDuplicates],
        layout: layout,
        frames: [],
        config: {
          responsive: true
        } 
      };
     
      //Sets state with the new variable
      setChartState(newChartState) 

    })
    .catch(error => {
      setError(true);
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
          useResizeHandler //Makes the chart responsive
          style={{width: "100%"}} //Has to be there for the responsiveness to work
          data={chartState.data}
          layout={chartState.layout}
          frames={chartState.frames}
          config={chartState.config}
          onInitialized={(figure) => setChartState(figure)}
          onUpdate={(figure) => setChartState(figure)} 
        />
      </>
    )
  }

  if (error === true) {
    return(<Error/>)
  } 
    

  return(
    <>
      {(chartState === null) ? renderSkeleton() : renderPage()}  
    </>
  )
}

export default BattleDeaths;


      