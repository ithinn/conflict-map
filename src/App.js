import React from 'react';

import {
BrowserRouter as Router,
Route,
Switch,
Link
} from "react-router-dom";
import MapContainer from "./containers/MapContainer";
import PCOContainer from "./containers/PCOContainer";
import PCOListContainer from "./containers/PCOListContainer";
import HomeContainer from "./containers/HomeContainer";
import GlobalStyle from "./components/GlobalStyle";
import Header from "./components/Header"
import OperationContainer from "./containers/OperationContainer";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Header/>
        <Switch>

          <Route path="/peacekeeping-operations:slug" component={OperationContainer}/>
          <Route path="/peacekeeping-operations" component={PCOListContainer}/>
          <Route path="/map" component={MapContainer}/>
          <Route exact path="/" component={HomeContainer}/>

        </Switch>
      </Router>
    </>
  )
};

export default App;