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

          <Route exact path="/" component={MapContainer}/>
          <Route path="/viz" component={VizContainer} />
          

        </Switch>
      </Router>
    </>
  )
};

export default App;