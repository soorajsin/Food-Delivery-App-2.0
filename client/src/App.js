import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Navbar/Nav";
import Register from "./Components/Account/Register";
import Login from "./Components/Account/Login";
import Homepage from "./Components/Home/Homepage";
import ManagementPage from "./Components/Management/ManagementPage";
import AddFood from "./Components/Management/ADD/AddFood";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/addFood" element={<AddFood/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
