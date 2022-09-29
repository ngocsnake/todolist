import "./App.css";

import Panel from "./Components/Panel";
import Menu from "./Components/Menu";

import { useState } from "react";

function App() {
  const [active, setActive] = useState("Myday");

  const [searchQuery, setSearchQuery] = useState("");

  const [openMenu, setOpenMenu] = useState(false);

  const handleActive = (tab) => {
    setActive(tab);
  };

  return (
    <div id="App">
      <Menu
        tab={active}
        handleActive={handleActive}
        setSearchQuery={setSearchQuery}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      ></Menu>
      <Panel
        tab={active}
        searchQuery={searchQuery}
        setOpenMenu={setOpenMenu}
      ></Panel>
    </div>
  );
}

export default App;
