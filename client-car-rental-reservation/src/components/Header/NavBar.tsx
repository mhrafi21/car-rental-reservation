import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiUser } from "react-icons/fi"; // import React, { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // logout

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold">
          MyCarRentals
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/about-us" className="hover:text-gray-400">
            About Us
          </Link>
          <Link to="/product" className="hover:text-gray-400">
            Cars
          </Link>
          <Link to="/booking" className="hover:text-gray-400">
            Booking
          </Link>
          <Link to="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </div>
        {!token ? (
          <Link to={"/signin"}>Singin/Signup</Link>
        ) : (
          <div className="hidden md:flex items-center space-x-4 relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <FiUser size={24} />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black opacity-50 z-40"
                  onClick={closeDropdown}
                ></div>
                <div className="absolute right-0 mt-48 w-48 z-50 bg-white text-black rounded-md shadow-lg py-2">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={closeDropdown}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/my-account"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={closeDropdown}
                  >
                    Profile
                  </Link>
                  {!token ? (
                    <Link
                      to="/signin"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      <button onClick={() => setDropdownOpen(false)}>
                        {" "}
                        Signin/Signup
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-200 w-full text-start"
                    >
                      <button onClick={() => setDropdownOpen(false)}>
                        Logout
                      </button>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-gray-700 text-white">
          <Link
            to="/cars"
            className="block px-4 py-2 border-b border-gray-600 hover:bg-gray-600"
            onClick={toggleMenu}
          >
            Cars
          </Link>
          <Link
            to="/about-us"
            className="block px-4 py-2 border-b border-gray-600 hover:bg-gray-600"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 border-b border-gray-600 hover:bg-gray-600"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <div className="border-t border-gray-600 mt-2">
            <Link
              to="/dashboard"
              className="block px-4 py-2 hover:bg-gray-600"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-600"
              onClick={toggleMenu}
            >
              Profile
            </Link>
            <div>
              {" "}
              <button
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
