import React, { useState } from "react";
import CustomNavigationMenu from "../CustomNavigationMenu/CustomNavigationMenu";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react"; // for hamburger icon

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoginPage = location.pathname === "/login";
  const userLogin = localStorage.getItem("userInfo");

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[var(--dark-background)] text-[var(--text-color-main)] relative">
      {/* Logo */}
      <img
        src="./imageForSite.png"
        alt="Site Logo"
        className="w-44 md:w-72 h-auto min-h-16"
      />

      {/* Hamburger Menu (visible on mobile only) */}
      <button
        className="md:hidden text-[var(--text-color-main)] focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {!isLoginPage && (
          <div className="header__navigation">
            <CustomNavigationMenu />
          </div>
        )}

        <div className="flex gap-4">
          {!userLogin ? (
            <>
              <Button
                className="cursor-pointer bg-[var(--primary-button)]"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
              {!isLoginPage && (
                <Button
                  className="cursor-pointer bg-[var(--primary-button)]"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
              )}
            </>
          ) : (
            <Button
              className="cursor-pointer bg-[var(--primary-button)]"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--dark-background)] flex flex-col items-center gap-4 py-4 md:hidden z-50 shadow-lg">
          {!isLoginPage && <CustomNavigationMenu />}

          {!userLogin ? (
            <>
              <Button
                className="w-40 bg-[var(--primary-button)]"
                onClick={() => {
                  navigate("/register");
                  setMenuOpen(false);
                }}
              >
                Sign Up
              </Button>
              {!isLoginPage && (
                <Button
                  className="w-40 bg-[var(--primary-button)]"
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              )}
            </>
          ) : (
            <Button
              className="w-40 bg-[var(--primary-button)]"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Log Out
            </Button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
