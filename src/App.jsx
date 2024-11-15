import { useState } from "react";
import Login from "./components/login/login";
import TableToolbar from "./components/table/table"

function App() {
  return (
    <div className="flex items-center justify-center">
      {/* <Login/> */}
      <TableToolbar/>
    </div>
  );
}

export default App;
