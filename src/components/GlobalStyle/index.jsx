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
        scroll-behavior: smooth;
    }

    body {
        font-family: sans-serif;
        color: #333;
        background: #f9f9f8;
    }

    header {
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 1em;
        background: white;
        width: 100%;
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
        font-size: .7rem;
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
 

    .popup {
        width: 20em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 2;
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
        
        margin-top: 1em;
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




`

export default GlobalStyle;