import React, { useState, useEffect }from "react";
import Cosmic from "cosmicjs";

function PCOListContainer() {

    const [pageData, setPageData] = useState(null);
    const [options, setOptions] = useState({
        title: {
            text: "My chart"
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
        },
        chart: {
            type: 'packedbubble',
            height: '100%',
            backgroundColor:"#f9f9f8"
        },
        plotOptions: {
            packedbubble: {
                minSize: '30%',
                maxSize: '120%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 250
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: [{data: []}]
    });

    useEffect(() => {
        fetch('https://ucdpapi.pcr.uu.se/api/battledeaths/20.1')
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error)
            })
    }, []); 

    useEffect(() => {
        //Sett opp cosmicpakken først.
        const client = new Cosmic()
        const bucket = client.bucket({
            slug: process.env.BUCKET_SLUG,
            read_key: process.env.READ_KEY
        });

        bucket.getObjects({
            type: 'operations',
            limit: 5,
            props: 'slug,title,metadata',
            sort: 'created_at'
        })
            .then(data => {
                console.log(data.objects);
                setPageData(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const renderSkeleton = () => {
        return(<p>Loading</p>)
    };

    const renderPage = () => {
        return(
            <main>
                <h2>PCO container content</h2>
                <ul>
                    {pageData.objects.map((item, index) => {
                        return <li key={item.title + index}>
                            <a href={`/peacekeeping-operations/${item.slug}`}>{item.title}</a>
                        </li>})}
                </ul>
            </main>

        )
    }
    return(
        <>
        {(pageData === null) ? renderSkeleton() : renderPage()}
        </>
        
        
    )
}

export default PCOListContainer;