import "./style.scss";
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { HomeSection } from "./Sections/HomeSection";
import { PracticeSection } from "./Sections/PracticeSection";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/practice"><PracticeSection /></Route>
          <Route path="/"><HomeSection /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
