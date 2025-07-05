// src/context/NavbarContext.jsx
import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export function NavbarProvider({ children }) {
  const [showBottomNavbar, setShowBottomNavbar] = useState(true);
  return (
    <NavbarContext.Provider value={{ showBottomNavbar, setShowBottomNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  return useContext(NavbarContext);
}
