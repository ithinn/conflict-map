import React from "react";
import styled from "styled-components";
import { MdErrorOutline } from "react-icons/md";
import SectionTitle from "../SectionTitle";
import Button from "../Button";


const ErrorBase = styled.section`
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #333;
    
`

function refreshPage() {
    window.location.reload()
}

function Error() {
    return(
    <ErrorBase>
        <MdErrorOutline />
        <SectionTitle>Serveren klarer ikke å laste innholdet, prøv igjen om litt.</SectionTitle>
        <Button 
            onClick={refreshPage} 
            color="none" 
            buttonWidth="fit-content" 
            buttonBorder="4px solid #333">Last på nytt</Button>
    </ErrorBase>
    )
}

export default Error;