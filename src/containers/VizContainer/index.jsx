import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import VizWrapper from "../../components/VizWrapper"
import scrollToComponent from "react-scroll-to-component";
import BattleDeaths from "../../components/BattleDeaths"
import RefugeesTime from "../../components/RefugeesTime"






function VizContainer() {

    function handleClickArrow(event) {
        console.log(event.target);
    }

    return(
        <main>
            <VizWrapper id="refugeesTime" func={handleClickArrow} comp={<RefugeesTime/>} />   
            <VizWrapper id="battleDeaths" func={handleClickArrow} comp={<BattleDeaths/>} />
            
        </main>
    )
}

export default VizContainer;