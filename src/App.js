import React, { useState } from "react";
import LeadsTable from "./LeadsTable";

function App() {
  const [del, setDel] = useState(false);
  function toggleDelete() {
    if (del) {
      setDel(false);
    } else {
      setDel(true);
    }
  }
  return (
    <div className="App">
      <h1>Leads Dashboard</h1>
      <LeadsTable toggleDelete={toggleDelete} changed={del} />
    </div>
  );
}

export default App;
