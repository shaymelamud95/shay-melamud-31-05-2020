import React from 'react';
import {Switch, Route} from "react-router-dom";


import Favorits from './app/components/Favorits';
import Home from './app/components/Home';
import Navigation from './app/components/Navigation';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  
  return (
      <div className="App"> 
      <main>
{/*         <header className="App-header">
 */}        <header className="">
              <h1>Welcome to Shay Melamud weather app!</h1>
              <Navigation/>
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/Favorits" component={Favorits}/>
                </Switch>
          </header>
          
          </main>
      </div>
  );
}

export default App;
