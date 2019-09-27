import React, {
  Component
} from "react";
import "./App.css";
import Hello from "test-module";

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Hello text="World" />
      </div>
    );
  }
}

export default App;
