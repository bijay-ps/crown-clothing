import React from "react";
import { Switch, Route } from 'react-router-dom';
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";

const HatsComponent = () => {
  return (
      <div>
        <h1>Hats</h1>
      </div>
  )
};

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/shop/hats" component={HatsComponent}/>
      </Switch>
    </div>
  );
}

export default App;
