import React, { useEffect, useState } from "react";
import styled from "styled-components";
import refugeeData from "../../../data/refugeeData.json";
import Skeleton from "../Skeleton";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from 'highcharts/highcharts-more' //module
HC_more(Highcharts);

const Container = styled.div`
    width: 90%;
    height: 90vh;
    margin: 0 auto;
`

function formatValue(string) {
    let withoutSpace = string === "-" ? 0 : Number(string.replace(/\s/g,''))
    return withoutSpace
}

function RefugeesTime() {

    const [options, setOptions] = useState(null)
        
        
    useEffect(() => {

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
        console.log(refugeeData.body);

        refugeeData.body.forEach((item, index) => {

            let nameValue = {
                name: item[2].replace(/[^a-zæøåA-ZÆØÅ.-\s]/g, ""),
                value: formatValue(item[3]) + formatValue(item[5])
            }

            for (let i = 0; i < series.length; i++) {
 
                if (series[i].name === item[1]) {
                    series[i].data.push(nameValue);
                }  
            }
        })

        let newOptions = 
        {
            title: {
                text: 'Hvilke land har flest mennesker på flukt?',
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
                        }
                    }
                }
            },
            series: [...series]
        } 
       
        setOptions(newOptions);

    }, [])

    


  
  
    function renderSkeleton() {
        console.log("skeleton rendered ref")
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
        console.log("page-rendered-ref")
        return(
        <Container>
            <HighchartsReact
            containerProps={{style: {height: '100%', width: "100%"}}} 
            highcharts={Highcharts}
            options={options}
            />
        </Container>)
    }


    return(<>
      
      {(options === null) ? renderSkeleton() : renderPage()}

    </>)
}

export default RefugeesTime;
