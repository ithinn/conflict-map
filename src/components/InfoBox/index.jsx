import React, {useRef} from "react";
import styled from "styled-components";
import Button from "../Button";
import FlexDiv from "../FlexDiv";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import confIcon from "../../img/conflict_icons/icon_bck_gray.png"
import opIcon from "../../img/Flags/un.png"

const InfoBoxBase = styled.article`
    background-color: white;
    width: 10em;
    height: auto;
    position: absolute;
    z-index: 1;
    padding: .5em;
    margin-top: 1em;
    left: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 4px 4px 7px 5px rgba(38,28,27,0.47);
`

const LabelAsButton = styled.label`
    font-size: .7rem;
    border: .1px solid black;
    padding: .3em .3em;
    text-align: center;
    display: flex;
    align-items: center;
    width: 100%;
    &:hover {
        background: rgba(3, 3, 3, .5);
        color: white;
    }
    &:active{
        background: #593131;
    }
    
`



const IconImage = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1em;
`

const InvisibleCheckbox = styled.input`
height: 1px;
width: 1px;
&:checked ~ label {
    background: #aebabf;
    color: black;
  
    border: 2px solid black;
}
//&:checked ~ label {
 //   box-shadow: inset 0px 0px 18px 5px rgba(0,0,0,0.56);
//}

`

function InfoBox({func, isInfo, handleClose }) {
    

    return(
        <InfoBoxBase>
            <FlexDiv width="96%" height="auto" direction="column">
                
                <div>
                <InvisibleCheckbox defaultChecked="true" onClick={func} type="checkbox" id="conflicts"></InvisibleCheckbox>
                <LabelAsButton htmlFor="conflicts">
                    <IconImage src={confIcon} />
                    Konflikter
                </LabelAsButton>
                </div>
                
                <div>
                <InvisibleCheckbox defaultChecked="true" onClick={func} type="checkbox" id="operations"></InvisibleCheckbox>
                <LabelAsButton htmlFor="operations">
                    <IconImage src={opIcon} />
                    FN-operasjoner
                </LabelAsButton>
                </div>
                
               
                
                
            </FlexDiv>

            <FlexDiv width="100%" height="auto" direction="column" align="flex-end">
            
                {isInfo ? 
                <IconContext.Provider value={{size: "1rem"}}>
                    <AiOutlineCloseCircle onClick={handleClose}/>
                </IconContext.Provider> : null}

                <FlexDiv width="100%" height="auto" direction="column" className="infowrap">

                </FlexDiv>
            </FlexDiv>
        </InfoBoxBase>
    )
}

export default InfoBox;