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
            <VizWrapper name="BattleDeaths" func={handleClickArrow} comp={<BattleDeaths/>} />
            <VizWrapper name="RefugeesTime" func={handleClickArrow} comp={<RefugeesTime/>} />   
        </main>
    )
}

export default VizContainer;