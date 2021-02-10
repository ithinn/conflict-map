import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    
    /*BASIC STYLING*/
    * {
        box-sizing: border-box;
    }

    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    html {
        font-size: 16px;
        line-height: 1.5;
        scroll-behavior: smooth;
    }

    body {
        font-family: "Arial";
        color: #333;
        background: #f9f9f8;
    }

    header {
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 2em;
        background: #f9f9f8;
        width: 100%;
        border-bottom: 2px dashed black;
        flex-direction: row; 
    }

    header img {
        width: 5em;
        margin-right: 1em;
    }

    header div {
        display: flex;
    }

    main {
        scroll-behavior: smooth;
        scroll-snap-type: y mandatory;
        overflow: auto;
    }

    h1, h2, h3 {
        margin: 0;
    }

    p {
        font-size: 1rem;
    }

    .mapboxgl-marker:hover {
        cursor: pointer;
    }

    .popup {
        width: 20em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }

    .popup img {
        width: 96%;
    }

    .popup h3, .popup p {
        margin: 0;
        text-align: center
    }

    .popupDate {
        font-style: italic;
    }
 
    .operations-marker {
        visibility: visible;
        z-index: 1;
    }

    .legend-wrapper {
        width: 100%;
        height: auto;
        margin-bottom: 1em;
    }

    .pol-wrapper {
        width: 100%;
        height: 4em;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .polygon1, .polygon2 {
        width: 1.3rem;
        height: 1.3rem;
        margin-right: 1em;
    }

    .polygon1 {
        background: rgba(200, 100, 240, 0.4)
    }

    .polygon2 {
        background: #64dbf0;
    }

    .infowrap h2 {
        margin: .5em 0;
    }

    .infowrap img {
        width: 100%;
        height: 10em;
        object-fit: cover;
        margin-bottom: 1em;

    }

    #battleDeaths {
        margin-top: 10em;
    }

    .show-source {
        display: block;
    }

    .source-content {
        display: none;
    }


    @media (max-width: 770px) {
        header {
            flex-direction: column;
            height: 20vh;
        }

        header img {
            display: none;
        }
    }


`

export default GlobalStyle;