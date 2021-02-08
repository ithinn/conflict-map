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
    width: 20%;
    min-width: 12em;
    height: auto;
    max-height: 80vh;
    position: absolute;
    z-index: 2;
    padding: .5em;
    margin-top: 1em;
    left: 5%;
    box-shadow: 4px 4px 7px 5px rgba(38,28,27,0.47);
    overflow-y: auto;
    padding: 1em;
    @media (min-width: 600px) {
        
    }
`


const LabelAsButton = styled.label`
    font-size: .9rem;
    padding: .3em .3em;
    text-align: left;
    display: flex;
    align-items: center;
    width: 100%;
    &:hover {
        background: lightgray; 
    }
    &:active{
        background: #593131;
    }

    @media (min-width: 1200px) {
        font-size: 1.3rem;
    }
    
`

const ImgDiv = styled.div`
width: 40px;
display: flex;
justify-content: flex-end;
height: auto;
background: darkgrey;
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
`

function InfoBox({func, isInfo, handleClose, conflictCB, operationsCB, refreshMap }) {
    

    return(
        <InfoBoxBase>
            <Button onClick={refreshMap}/>
            
            <div >
                <div>
                    <InvisibleCheckbox defaultChecked="true" onClick={func} type="checkbox" id="conflicts" />
                    <LabelAsButton htmlFor="conflicts">
                        {conflictCB ? 
                        <ImgDiv>
                            <IconImage src={confIcon} />
                        </ImgDiv> 
                        : 
                        <ImgDivOff>
                            <IconImage src={confIcon} />
                        </ImgDivOff>}
                        
                        Konflikter
                    </LabelAsButton>
                </div>
                
                <div>
                    <InvisibleCheckbox defaultChecked="true" onClick={func} type="checkbox" id="operations" />
                    <LabelAsButton htmlFor="operations">
                        
                        {operationsCB ? 
                        <ImgDiv>
                            <IconImage src={opIcon} />
                        </ImgDiv> 
                        : 
                        <ImgDivOff>
                            <IconImage src={opIcon} />
                        </ImgDivOff>}
                        
                        FN-operasjoner
                    </LabelAsButton>
                </div>
                
            </div>

            <FlexDiv >
                {isInfo ? 
                <IconContext.Provider value={{size: "2rem"}}>
                    <AiOutlineCloseCircle onClick={handleClose}/>
                </IconContext.Provider> : null}

                <div className="infowrap"></div>
            </FlexDiv>
        </InfoBoxBase>
    )
}

export default InfoBox;