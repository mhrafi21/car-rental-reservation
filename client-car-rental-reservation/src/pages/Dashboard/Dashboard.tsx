import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import UserDash from "./UserDash/UserDash";
import AdminDash from "./AdminDash/AdminDash";
import Header from "../../components/Header/Header";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { TUser } from "../../interfaces";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility

  const user: TUser = useAppSelector(useCurrentUser);

  return (
    <div >
      <Header />
      <div>

          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar */}
            <div
              className={`bg-gray-800 p-5 w-64 lg:w-1/5 fixed lg:static inset-y-0 left-0 transition-transform transform ${
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
              }`}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="text-white text-2xl">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </div>
                {/* Close Button for Mobile */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white lg:hidden focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              {user?.role == "admin" ? <AdminDash /> : <UserDash />}
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 dark:bg-black min-h-screen p-6">
              {/* Navbar for Mobile */}
              <div className="lg:hidden mb-4 flex justify-between items-center">
                <button
                  onClick={() => setIsOpen(true)} // Open sidebar when clicked
                  className="text-gray-700 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </button>
                <div className="text-xl font-bold">Dashboard</div>
              </div>

              <div>
                <Outlet />
              </div>
            </div>
          </div>

      </div>
    </div>
  );
};

export default Dashboard;
