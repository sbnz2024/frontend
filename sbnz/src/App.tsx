import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Navbar";
import Home from "./Pages/Home";
import Recommended from "./Pages/Recommended";
import ArrangementPage from "./Pages/Arrangement";
import CreateArrangement from "./Pages/CreateArragement";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {" "}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reccomended" element={<Recommended />} />
        <Route path="/arr/:arrId" element={<ArrangementPage />} />
        <Route path="/create" element={<CreateArrangement />} />
      </Routes>
    </>
  );
}

export default App;
