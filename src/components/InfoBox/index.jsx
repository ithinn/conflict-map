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
`

const LabelAsButton = styled.label`
    font-size: .7rem;
    border: 2px solid #261c1b;
    padding: .2em .2em;
    text-align: center;
    display: flex;
    align-items: center;
    width: 100%;
  
    
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
`

function InfoBox({func, isInfo }) {
    

    return(
        <InfoBoxBase>
            <FlexDiv width="96%" height="auto" direction="column">
                <LabelAsButton htmlFor="conflicts">
                    <IconImage src={confIcon} />
                    Konflikter
                </LabelAsButton>

                <InvisibleCheckbox defaultChecked="true" onClick={func} type="checkbox" id="conflicts"></InvisibleCheckbox>
                
                <LabelAsButton htmlFor="operations">
                    <IconImage src={opIcon} />
                    FN-operasjoner</LabelAsButton>
                
                <InvisibleCheckbox defaultChecked="true" onClick={func} type="checkbox" id="operations"></InvisibleCheckbox>
                
                
            </FlexDiv>

            <FlexDiv width="100%" height="auto" direction="column" align="flex-end">
            
                {isInfo ? 
                <IconContext.Provider value={{size: "1rem"}}>
                    <AiOutlineCloseCircle/>
                </IconContext.Provider> : null}

                <FlexDiv width="100%" height="auto" direction="column" className="infowrap">

                </FlexDiv>
            </FlexDiv>
        </InfoBoxBase>
    )
}

export default InfoBox;