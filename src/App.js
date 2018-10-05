import React, { Component } from "react";
import Page1 from "./components/container/Page1/Page1";
import Page2 from "./components/container/Page2/Page2";
import Page3 from "./components/container/Page3/Page3";
import Page4 from "./components/container/Page4/Page4";

import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Page1} />
            <Route path="/Page2" component={Page2} />
            <Route path="/Page3" component={Page3} />
            <Route path="/Page4" component={Page4} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
