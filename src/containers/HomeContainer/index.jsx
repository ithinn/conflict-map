import React, { useEffect } from "react";
import Button from "../../components/Button";
import BubbleContainer from "../BubbleContainer";

function HomeContainer() {

    useEffect(() => {
        
    }, [])

    return(
        <main>

            <h2>Home container content</h2>
            <BubbleContainer/>
        </main>
        
    )
}

export default HomeContainer;