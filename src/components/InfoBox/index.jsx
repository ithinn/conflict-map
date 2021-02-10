import React from "react";
import styled from "styled-components";
import Button from "../Button";
import confIcon from "../../img/conflict_icons/icon_bck_gray.png"
import opIcon from "../../img/Flags/un.png"


export const InfoBoxBase = styled.article`
    background-color: white;
    width: 20%;
    min-width: 12em;
    height: auto;
    max-height: 80vh;
    position: absolute;
    z-index: 2;
    padding: 1em;
    margin-top: 1em;
    left: 5%;
    box-shadow: 4px 4px 7px 5px rgba(38,28,27,0.47);
    overflow-y: auto;   
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

    @media (min-width: 1500px) {
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

export const InvisibleCheckbox = styled.input`
    height: 1px;
    width: 1px;
`

function InfoBox({func, conflictCB, operationsCB, refreshMap }) {

    return(
        <InfoBoxBase>
            <Button 
                onClick={refreshMap} 
                color="white" 
                buttonWidth="100%" 
                buttonBorder="none"
            />
            
            <div >
                <div>
                    <InvisibleCheckbox 
                        defaultChecked="true" 
                        onClick={func} 
                        type="checkbox" 
                        id="conflicts"
                    />

                    <LabelAsButton htmlFor="conflicts">
                        {conflictCB === true ? 
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
                    <InvisibleCheckbox 
                        defaultChecked="true" 
                        onClick={func} 
                        type="checkbox"    
                        id="operations" 
                    />

                    <LabelAsButton htmlFor="operations">
                        
                        {operationsCB === true ? 
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

            <div className="infowrap"></div>
          
        </InfoBoxBase>
    )
}

export default InfoBox;

