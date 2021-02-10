import React, { useEffect, useState } from "react";
import styled from "styled-components";
import refugeeData from "./refugeeData.json";
import Skeleton from "../Skeleton";
import Error from "../Error";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from 'highcharts/highcharts-more'

HC_more(Highcharts);

const Container = styled.div`
    width: 90%;
    height: 90vh;
    margin: 0 auto;
`

//Used to format the values from the data 
//Replaces all instances of "-" with null, and removes all spaces from the remaining data. 
function formatValue(string) {
    let withoutSpace = string === "-" ? null : Number(string.replace(/\s/g,''))
    return withoutSpace
}


function RefugeesFrom() {

    const [options, setOptions] = useState(null)
        
    useEffect(() => {

        //Creates a variable with the right structure for the "series" property in the HighChart.
        //Values in the data will be pushed into the right array. 
        let series = [
            {
                name: "Europa",
                data: []
            },
            {
                name: "Afrika",
                data: []
            },
            {
                name: "Asia",
                data: []
            },
            {
                name: "Oseania",
                data: []
            },
            {
                name: "Nord-Amerika",
                data: []
            },
            {
                name: "Sør-Amerika",
                data: []
            },
            {
                name: "Diverse/Statsløse",
                data: []
            },

        ]
   
        //Loops through the data
        refugeeData.body.forEach(item => {

            //Creates an object with name and value for each data instance. 
            //Removes all characters that are not a letter (including the Norwegian Æ,Ø,Å,), and spaces, from "name". 
            //uses the formatValue function to remove spaces from the values. 
            //Adds values from two arrays (internally displaced people and people who fled the country), and stores the result in "value"

            let nameValue = {
                name: item[2].replace(/[^a-zæøåA-ZÆØÅ.-\s]/g, ""),
                value: formatValue(item[3]) + formatValue(item[5])
            }

            //Pushes nameValue into the right array of the "series" variable.
            for (let i = 0; i < series.length; i++) {
                if (series[i].name === item[1]) {
                    series[i].data.push(nameValue);
                }  
            }
        })


        //Stores all the chart-data - including "series" into newOptions
        let newOptions = 
        {
            title: {
                text: 'Hvilke land har flest innbyggere på flukt?',
                style: {
                    fontSize: "2rem",
                    fontWeight: "400",
                },
            },
            colors: ['orange', 'red', 'green', 'blue', 'gray', 'purple', 'pink', 'lightblue', 'marine'],
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value} på flukt'
            },
            chart: {
                type: 'packedbubble',
                backgroundColor:"#f9f9f8",
                style: {
                    'font-family': 'Arial'
                }
            },
            plotOptions: {
                packedbubble: {
                    useSimulation: true,
                    minSize: '30%',
                    maxSize: '400%',
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02,
                        initialPositions: "circle",
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 1000000
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal',
                            fontSize: "15px",
                        }
                    }
                }
            },
            series: [...series]
        } 
        
        //Sets state with newOptions
        setOptions(newOptions);

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
        <Container>
            <HighchartsReact
            containerProps={{style: {height: '100%', width: "100%"}}} //Responsitivity 
            highcharts={Highcharts}
            options={options}
            />
        </Container>)
    }

    if (options === undefined) {
        return(<Error/>)
    }

    return(
        <>  
        {(options === null) ? renderSkeleton() : renderPage()}
        </>
    )
}

export default RefugeesFrom;
