import React, { useState, useEffect }from "react";
import Cosmic from "cosmicjs";

function PCOListContainer() {

    const [pageData, setPageData] = useState(null);

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
                console.log(data);
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
                    {pageData.objects.map(item => {
                        return 
                        <li>
                            <a href={`/peacekeeping-operations/${item.slug}`}></a>
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