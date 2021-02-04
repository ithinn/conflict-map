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
    width: 12em;
    height: auto;
    position: absolute;
    z-index: 1;
    padding: .5em;
    margin-top: 1em;
    left: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 4px 4px 7px 5px rgba(38,28,27,0.47);

    
`

const LabelAsButton = styled.label`
    font-size: .8rem;
    
    padding: .3em .3em;
    text-align: center;
    display: flex;
    align-items: center;
    width: 100%;
    &:hover {
        background: lightgray;
        
    }
    &:active{
        background: #593131;
    }
    
`

const ImgDiv = styled.div`
width: 40px;
display: flex;
justify-content: flex-end;
height: auto;
background: lightgray;
border: 1px darkgrey solid;
border-radius: 10em;
margin-right: 1em;

box-shadow: inset 0px 0px 1px 1px rgba(0,0,0,0.25);
`

const ImgDivOff = styled(ImgDiv)`
justify-content: flex-start;
background: #f9f9f8;

`

const IconImage = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
    
`

const InvisibleCheckbox = styled.input`
height: 1px;
width: 1px;
&:checked ~ label {
    
}

`

function InfoBox({func, isInfo, handleClose, conflictCB, operationsCB }) {
    

    return(
        <InfoBoxBase>
            <FlexDiv width="96%" height="auto" direction="column">
                
                <div>
                <InvisibleCheckbox defaultChecked="true" onClick={func} type="checkbox" id="conflicts"></InvisibleCheckbox>
                <LabelAsButton htmlFor="conflicts">
                    {conflictCB ? <ImgDiv>
                        <IconImage src={confIcon} />
                    </ImgDiv> : <ImgDivOff>
                        <IconImage src={confIcon} />
                    </ImgDivOff>}
                    
                    Konflikter
                </LabelAsButton>
                </div>
                
                <div>
                <InvisibleCheckbox defaultChecked="true" onClick={func} type="checkbox" id="operations"></InvisibleCheckbox>
                <LabelAsButton htmlFor="operations">
                    
                    {operationsCB ? <ImgDiv>
                        <IconImage src={opIcon} />
                    </ImgDiv> : <ImgDivOff>
                        <IconImage src={opIcon} />
                    </ImgDivOff>}
                    
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