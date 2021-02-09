import React from "react";
import styled from "styled-components";
import { FiRefreshCw } from "react-icons/fi";


const ButtonBase = styled.button`
  font-size: 1.5rem;
  background: ${props => props.color};
  color: #333;
  padding: .5em;
  margin: 0 auto;
  border: ${props => props.buttonBorder};  
  width: ${props => props.buttonWidth};
  display: inline-block;
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    color: white;
  }
`

function Button( { children,onClick, color, buttonWidth, buttonBorder } ) {
    return(
        <ButtonBase 
          onClick={onClick} 
          color={color} 
          buttonWidth={buttonWidth} 
          buttonBorder={buttonBorder}> 

          <FiRefreshCw/>
        {children} 
        </ButtonBase>
    )
}

export default Button;