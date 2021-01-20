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
    }

    body {
        font-family: sans-serif;
        color: #333;
        background: #f9f9f8;
    }

    h1, h2, h3 {
        margin: 0 0 1.5rem;
    }


`

export default GlobalStyle;