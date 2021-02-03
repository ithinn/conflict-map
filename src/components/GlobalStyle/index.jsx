import { createGlobalStyle } from "styled-components";
import planesImg from "../../img/UX_Gun_on_Unsplash.jpg";



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
    }

    body {
        font-family: sans-serif;
        color: #333;
        background: #f9f9f8;
    }

    header {
        height: 10vh;
        background-image: url(${planesImg});
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 1em;
    }

    main {
        margin-top: 2em;
    }

    h1, h2, h3 {
        margin: 0 0 1.5rem;
    }

    .popup img {
        width: 80%;
    }

    .popup h3 {
        margin: 0;
    }

    .popup p {
        margin: 0;
    }

    .popup {
        width: 20em;
        display: flex;
        flex-direction: column;
    }

    .operations-marker {
        visibility: visible;
    }




`

export default GlobalStyle;