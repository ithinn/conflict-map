import React from "react";
import styled from "styled-components";
import { FiRefreshCw } from "react-icons/fi";


const ButtonBase = styled.button`
  font-size: 1.5rem;
  background: white;
  color: #333;
  padding: .5em;
  width: 100%;
  border: none;  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`


function Button( { onClick } ) {
    return(
        <ButtonBase onClick={onClick}> 
          <FiRefreshCw/>
        </ButtonBase>
    )
}

export default Button;