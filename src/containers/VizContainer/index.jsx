import React from "react";
import VizWrapper from "../../components/VizWrapper"
import BattleDeaths from "../../components/BattleDeaths"
import RefugeesFrom from "../../components/RefugeesFrom"


function VizContainer() {

    return(
        <main>
            <VizWrapper id="refugeesFrom" comp={<RefugeesFrom/>} index="0" />   
            <VizWrapper id="battleDeaths" comp={<BattleDeaths/>} index="1" />
        </main>
    )
}

export default VizContainer;