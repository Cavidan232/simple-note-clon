import React, { useState } from 'react';
import logo from "../../assets/logo.png";
import icMenu from "../../assets/ic_menu.png";
import icCross from "../../assets/ic_cross.png";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('currentUser2') ? JSON.parse(localStorage.getItem('currentUser2')) : null);
const navigate=useNavigate()
  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser2'); 
    setUser(null);
    navigate("/login")
  };

  return (
    <header className="bg-transparent py-4">
      <div className="container mx-auto flex justify-between items-center px-8">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-8 w-8 mr-2" />
          <a className="text-xl text-custom-dark font-bold" href='/'>CavidanNote</a>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link className="text-custom-dark hover:text-black" to="/contact">Contact Us</Link>
          <Link className="text-custom-dark hover:text-black" to="/help">Help</Link>
          <Link className="text-custom-dark hover:text-black" to="/blog">Blog</Link>
          <Link className="text-custom-dark hover:text-black" to="/support">Support Form</Link>
          <div className="border-l border-gray-300 h-6"></div>
          {user ? (
            <>
              <Link className="text-custom-dark hover:text-black" to="/profile">{user.name}</Link>
              <button
                className="text-custom-dark hover:text-black border border-gray-500 rounded px-2 py-1 mt-[-4px]"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link className="text-custom-dark hover:text-black" to="/login">Login</Link>
              <Link className="text-custom-dark hover:text-black border border-gray-500 rounded px-2 py-1 mt-[-4px]" to="/register">Register</Link>
            </>
          )}
         <Link className="text-custom-dark hover:text-black" to="/notes" onClick={handleMenu}>Notes</Link>
        </div>
        <div className="md:hidden">
          <button onClick={handleMenu}>
            <img src={isMenuOpen ? icCross : icMenu} alt="Menu icon" className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div
        className={`absolute top-16 right-0 z-20 w-[50%] bg-custom-light transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden md:hidden flex flex-col items-center space-y-4 py-4`}
      >
        <Link className="text-custom-dark hover:text-black" to="/contact" onClick={handleMenu}>Contact Us</Link>
        <Link className="text-custom-dark hover:text-black" to="/help" onClick={handleMenu}>Help</Link>
        <Link className="text-custom-dark hover:text-black" to="/blog" onClick={handleMenu}>Blog</Link>
        <Link className="text-custom-dark hover:text-black" to="/support" onClick={handleMenu}>Support Form</Link>
        <div className="border-t border-gray-300 w-full"></div>
        {user ? (
          <>
            <Link className="text-custom-dark hover:text-black" to="/profile" onClick={handleMenu}>{user.name}</Link>
            <button
              className="text-custom-dark hover:text-black border border-gray-500 rounded px-2 py-1 mt-[-4px]"
              onClick={() => {
                handleLogout();
                handleMenu();
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link className="text-custom-dark hover:text-black" to="/login" onClick={handleMenu}>Login</Link>
            <Link className="text-custom-dark hover:text-black border border-gray-500 rounded px-2 py-1 mt-[-4px]" to="/register" onClick={handleMenu}>Register</Link>
          </>
        )}
        <Link className="text-custom-dark hover:text-black" to="/notes" onClick={handleMenu}>Notes</Link>
      </div>
    </header>
  );
}

export default Navbar;
