import { useState } from "react";
import logo from "./../assets/logo.png";

const Navbar = ({ showLoginForm, setShowLoginForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setShowLoginForm(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {!showLoginForm && (
        <nav className="fixed top-0 left-0 w-full bg-gray-950 text-white p-4 shadow-md z-50">
          <div className="container mx-auto flex justify-between items-center">
            <img src={logo} alt="ADR Logo" className="w-15 h-15 contain-content" />
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-blue-600 ml-4">ADRSafe</h1>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>

            <div className={`md:block ${isOpen ? "block" : "hidden"}`}>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md">
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 py-2 text-blue-100 font-semibold rounded-md w-full transition-all duration-300">
                  Login
                </button>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
