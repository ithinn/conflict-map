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
    height: 100vh;
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
                text: 'Hvilke land har flest mennesker på flukt?'
            },
            colors: ['orange', 'red', 'green', 'blue', 'gray', 'purple', 'pink', 'lightblue', 'marine'],
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value} på flukt'
            },
            chart: {
                type: 'packedbubble',
                height: '50%',
                backgroundColor:"#f9f9f8",
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '400%',
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02,
                        initialPositions: "circle",
                    },
                    dataLabels: {
                        enabled: false,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>=',
                            value: 200
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
