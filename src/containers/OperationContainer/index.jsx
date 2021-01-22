import Cosmic from "cosmicjs";
import React, { useEffect } from "react";


function OperationContainer( { match }) {

    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const client = new Cosmic();
        const bucket = client.bucket({
            slug: process.env.BUCKET_SLUG,
            read_key: process.env.READ_KEY
        });


        const params = {
            slug: match.params.slug,
            props:'slug,title,content,metadata'
        };

        bucket.getObject(params)
            .then(data => {
                console.log(data);
                setPageData(data.object);
            })
            .catch(error => {
                console.log(error)
            })


    }, [])

    /*
    renderHeaderImg = () => {
        return(<HeadImgBase src={pageData.metadata.header_image.imgix_url} alt={pageData.metadata.})
    }*/

    return(
        <main>
            <h2>Operation container content</h2>
        </main>
        
    )
}

export default OperationContainer;