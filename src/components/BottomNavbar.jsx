import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaComments,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdUpdate, MdGroups } from "react-icons/md";

export default function BottomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideBottomPaths = ["/", "/login", "/signup"];

  if (hideBottomPaths.includes(location.pathname)) return null;

  const navItems = [
    { label: "Chats", to: "/chat", icon: <FaComments /> },
    { label: "Updates", to: "/update", icon: <MdUpdate /> },
    { label: "Communities", to: "/com", icon: <MdGroups /> },
    { label: "Profile", to: "/profile", icon: <FaUserCircle /> },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      navigate("/");
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/30 backdrop-blur-md shadow-md z-50">
      <div className="flex justify-between px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `w-full text-center flex flex-col items-center text-[10px] transition-all duration-300 ${
                isActive ? "text-green-500 font-semibold" : "text-gray-800"
              } hover:text-green-600`
            }
          >
            <div className="p-1 rounded-full hover:bg-green-100 transition">
              <span className="text-lg">{item.icon}</span>
            </div>
            <span className="leading-none">{item.label}</span>
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="w-full text-center flex flex-col items-center text-[10px] text-red-500 hover:text-red-600 transition"
        >
          <div className="p-1 rounded-full hover:bg-red-100 transition">
            <FaSignOutAlt className="text-lg" />
          </div>
          <span className="leading-none">Logout</span>
        </button>
      </div>
    </div>
  );
}
