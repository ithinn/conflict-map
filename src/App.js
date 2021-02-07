import React from 'react';

import {
BrowserRouter as Router,
Route,
Switch,
Link
} from "react-router-dom";
import MapContainer from "./containers/MapContainer";

import HomeContainer from "./containers/HomeContainer";
import GlobalStyle from "./components/GlobalStyle";
import Header from "./components/Header"

import VizContainer from "./containers/VizContainer";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Header/>
        <Switch>

          <Route path="/map" component={MapContainer}/>
          <Route path="/viz" component={VizContainer} />
          <Route exact path="/" component={HomeContainer}/>

        </Switch>
      </Router>
    </>
  )
};

export default App;