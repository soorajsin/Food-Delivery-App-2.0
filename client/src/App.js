import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Navbar/Nav";
import Register from "./Components/Account/Register";
import Login from "./Components/Account/Login";
import Homepage from "./Components/Home/Homepage";
import ManagementPage from "./Components/Management/ManagementPage";
import AddFood from "./Components/Management/ADD/AddFood";
import Updatepage from "./Components/Management/Update/Updatepage";
import AddToCartFood from "./Components/Home/AddToCart/AddToCartFood";
import TrackPage from "./Components/Management/Track/TrackPage";
import ReplyPage from "./Components/Management/Track/Reply/ReplyPage";
import TrackUpdate from "./Components/Management/Track/UpdateTrack/TrackUpdate";
import BuyFoodPage from "./Components/Home/AddToCart/BuyFood/BuyFoodPage";

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
          <Route path="/addFood" element={<AddFood />} />
          <Route path="/updateFood/:addFoodId" element={<Updatepage />} />
          <Route path="/shopping" element={<AddToCartFood />} />
          <Route path="/shoppingBuy/:addToCartId" element={<BuyFoodPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/reply/:buyFoodId" element={<ReplyPage />} />
          <Route path="/replyUpdate/:responseId" element={<TrackUpdate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
