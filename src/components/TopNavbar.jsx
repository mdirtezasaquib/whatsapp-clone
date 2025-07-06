import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaWhatsapp,
  FaComments,
  FaUserCircle,
  FaSignOutAlt,
  FaEllipsisV,
} from "react-icons/fa";
import { MdUpdate, MdGroups } from "react-icons/md";

export default function TopNavbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      navigate("/"); 
    }
  };

  const navItems = [
    { label: "Chats", to: "/chat", icon: <FaComments /> },
    { label: "Updates", to: "/update", icon: <MdUpdate /> },
    { label: "Communities", to: "/com", icon: <MdGroups /> },
    { label: "Profile", to: "/profile", icon: <FaUserCircle /> },
  ];

  const dropdownOptions = [
    "New Group",
    "New Broadcast",
    "Linked Devices",
    "Starred",
    "Payments",
    "Read All",
    "Settings",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">


          <div className="flex items-center gap-2">
            <FaWhatsapp className="text-[#25D366] text-2xl" />
            <span className="text-xl font-bold text-[#075E54]">WhatsApp</span>
          </div>

          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-sm font-medium transition-colors ${
                      isActive ? "text-[#2ca194]" : "text-gray-600"
                    } hover:text-[#25D366]`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition"
              >
                <FaSignOutAlt className="text-lg" />
                Logout
              </button>
            </div>

        
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-xl text-gray-700 hover:text-[#2ca194]"
              >
                <FaEllipsisV />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 bg-teal-50 rounded-md w-48 z-50 shadow">
                  {dropdownOptions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        alert(`${item} Coming Soon...`);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
