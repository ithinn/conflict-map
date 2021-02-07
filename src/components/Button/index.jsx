import React from "react";
import styled from "styled-components";
import { FiRefreshCw } from "react-icons/fi";


const ButtonBase = styled.button`
  font-size: 1rem;
  background: white;
  color: #333;
  padding: .5em;
  margin-left: .5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none; 
  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`


function Button( {onClick, children} ) {
    return(
        <ButtonBase onClick={onClick}> 
          <FiRefreshCw/>
         
        </ButtonBase>
    )
}

export default Button;