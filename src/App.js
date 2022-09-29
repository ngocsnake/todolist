import "./App.css";

import Panel from "./Components/Panel";
import Menu from "./Components/Menu";

import { useState } from "react";

function App() {
  const [active, setActive] = useState("Myday");

  const [searchQuery, setSearchQuery] = useState("");

  const handleActive = (tab) => {
    setActive(tab);
  };

  return (
    <div id="App">
      <Menu
        tab={active}
        handleActive={handleActive}
        setSearchQuery={setSearchQuery}
      ></Menu>
      <Panel tab={active} searchQuery={searchQuery}></Panel>
    </div>
  );
}

export default App;
