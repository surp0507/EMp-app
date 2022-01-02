import Employee from "./Employee";
import { Login } from "./Login";
import { IndividualEmp } from "./IndividualEmp";
import { Link } from "react-router-dom";
import { Admin } from "./Admin";
import { HeaderCmp } from "./HeaderCmp";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderCmp />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/emp/:id" element={<IndividualEmp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
