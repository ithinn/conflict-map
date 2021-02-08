import React from "react";
import styled from "styled-components";
import { MdErrorOutline } from "react-icons/md";
import SectionTitle from "../SectionTitle";

const ErrorBase = styled.section`
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

function Error() {
    <section>
        <MdErrorOutline />
        <SectionTitle>Serveren klarer ikke å laste innholdet, prøv igjen om litt.</SectionTitle>
    </section>
}

export default Error;