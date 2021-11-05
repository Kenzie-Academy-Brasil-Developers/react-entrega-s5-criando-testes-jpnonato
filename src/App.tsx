import React from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Address from "./components/Cep";

import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Search />
      <Address />
    </div>
  );
}

export default App;
