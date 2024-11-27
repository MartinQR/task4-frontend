import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import TableToolbar from "./components/table/table";
import SignUp from "./components/signUp/signUp";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div className="flex items-center justify-center">
        <Toaster></Toaster>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/table" element={<TableToolbar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
