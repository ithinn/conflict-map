import React from "react";
import styled from "styled-components";


const ButtonBase = styled.button`
  font-size: 1rem;
  background-color: blue;
  color: white;
  padding: .5em;
  
`
function Button( {children} ) {
    return(
        <ButtonBase> {children} </ButtonBase>
    )
}

export default Button;