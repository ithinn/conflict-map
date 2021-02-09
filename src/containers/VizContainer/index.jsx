import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import VizWrapper from "../../components/VizWrapper"
import scrollToComponent from "react-scroll-to-component";
import BattleDeaths from "../../components/BattleDeaths"
import RefugeesFrom from "../../components/RefugeesFrom"






function VizContainer() {

    function handleClickArrow(event) {
        console.log(event.target);
    }

    return(
        <main>
            <VizWrapper id="RefugeesFrom" func={handleClickArrow} comp={<RefugeesFrom/>} />   
            <VizWrapper id="battleDeaths" func={handleClickArrow} comp={<BattleDeaths/>} />
            
        </main>
    )
}

export default VizContainer;