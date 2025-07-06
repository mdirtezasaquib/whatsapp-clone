import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import WelcomeScreen from "./pages/WelcomeScreen";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import Update from "./pages/Update";
import Community from "./pages/Community";
import Profile from "./pages/Profile";

import TopNavbar from "./components/TopNavbar";


const PrivateRoute = ({ element }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return currentUser ? element : <Navigate to="/login" />;
};


function AppRoutes() {
  const location = useLocation();

  
  const hideTopNavbarPaths = ["/", "/login", "/signup"];
  const shouldShowTopNavbar = !hideTopNavbarPaths.includes(location.pathname);

  return (
    <>
    
      {shouldShowTopNavbar && <TopNavbar />}

      
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<PrivateRoute element={<ChatPage />} />} />
        <Route path="/update" element={<PrivateRoute element={<Update />} />} />
        <Route path="/com" element={<PrivateRoute element={<Community />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      </Routes>
    </>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
