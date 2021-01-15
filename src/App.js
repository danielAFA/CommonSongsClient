import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FlexContainer, TopNav } from "./Styled";
import Home from "./components/Home";
import About from "./components/About";

const App = () => {
  return (
    <FlexContainer>
      <Router>
        <TopNav />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </FlexContainer>
  );
};

export default App;
