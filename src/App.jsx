import { BrowserRouter, Routes, Route } from "react-router-dom";

import WelcomeScreen from "./pages/WelcomeScreen";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProfileSetup from "./pages/ProfileSetup"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<WelcomeScreen />} />

      
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        
        <Route path="/profile-setup" element={<ProfileSetup />} />

        
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
