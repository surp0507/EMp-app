import Employee from "./Employee";
import { Login } from "./Login";
import { IndividualEmp } from "./IndividualEmp";
import { Admin } from "./Admin";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Employee />} />
          <Route path="/emp/:id" element={<IndividualEmp />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<Admin/>}/>
        
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
