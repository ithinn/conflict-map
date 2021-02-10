import React from "react";
import styled from "styled-components";
import { InfoBoxBase } from "../InfoBox";


const SourceBoxBase = styled(InfoBoxBase)``;

function SourceBox( {id} ) {

    let battleBox = document.getElementById(`boxbattleDeaths`)
    let refBox = document.getElementById("boxrefugeesFrom")

    function showSource(event) {
        if (event.target.id === "btnbattleDeaths") {

            battleBox.style.display="block";

            battleBox.innerHTML =  `
            <p>Dataene i denne grafen er hentet fra datasettet "Battle Deaths". 
            Det viser UCDPs estimat for "battle-related deaths" 
            - altså hvor mange som har blitt drept i forbindelse med kamper.</p> 

            <p><strong>Kreditering: </strong> UCDP Uppsala Conflict Data Program, 
            Pettersson, Therese & Magnus Öberg (2020) Organized violence, 1989-2019. 
            Journal of Peace Research 57(4).<p/>

            <a href="https://ucdp.uu.se/encyclopedia" target="blank">Gå til kilden</a>
            `
        } else {

            refBox.style.display="block";

            refBox.innerHTML = `
            <p>Tallene i statistikken er hentet fra Flyktninghjelpens 
            Flyktningregnskap 2020.</p>

            <p>Datasettet blir oppdatert i juni hvert år. </p>

            <p>Figuren viser antall mennesker fra landet som er på flukt; 
            både internt fordrevne og de som har flyktet til et annet land.</p>  
            <a href="https://www.flyktninghjelpen.no/flyktningregnskapet" target="blank">
            Gå til kilden</a>
            `
        }
    }

    function hideSource(event) {
        if (event.target.id === "btnbattleDeaths") {
            battleBox.style.display = "none"
            battleBox.innerHTML = ""
        } else {
            refBox.style.display = "none";
            refBox.innerHTML = "";
        }
    }

    return(
        <>
        <button 
            id={"btn"+id} 
            onMouseEnter={showSource} 
            onMouseLeave={hideSource}> Se kilde </button>

        <SourceBoxBase id={"box"+id} className="source-content" />
        </>
    )
}

export default SourceBox