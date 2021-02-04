import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import VizWrapper from "../../components/VizWrapper"
import scrollToComponent from "react-scroll-to-component";

function VizContainer() {


    return(
        <main>
            <VizWrapper name="BattleDeaths" />
            <VizWrapper name="RefugeesTime" />
          
        </main>
    )
}

export default VizContainer;