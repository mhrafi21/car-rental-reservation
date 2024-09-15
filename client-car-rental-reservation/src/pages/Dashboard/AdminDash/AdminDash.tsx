import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUsers } from 'react-icons/fi';
import { FaCar, FaClipboardList } from 'react-icons/fa';


function AdminDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle clicks outside of the sidebar
  useEffect(() => {     
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (isSidebarOpen && !target.closest('.sidebar') && !target.closest('.toggle-button')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className='md:flex fixed top-0 left-0 bottom-0'>
      <div
        className={`sidebar bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } 2xl:relative 2xl:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <Link to="/" className="text-white flex items-center space-x-2 px-4">
          <span className="text-2xl font-extrabold">MyCarRentals</span>
        </Link>

        <nav className="mt-10 min-h-screen">
          <Link
            to="/dashboard"
            className="flex items-center p-2 hover:bg-gray-700 rounded-md"
          >
            <FiHome className="mr-2" />
            <span>Dashboard Admin</span>
          </Link>
          <Link
            to="/dashboard/manage-cars"
            className="flex items-center p-2 hover:bg-gray-700 rounded-md"
          >
            <FaCar className="mr-2" />
            <span>Manage Cars</span>
          </Link>
          <Link
            to="/dashboard/manage-bookings"
            className="flex items-center p-2 hover:bg-gray-700 rounded-md"
          >
            <FaClipboardList className="mr-2" />
            <span>Manage Bookings</span>
          </Link>
          <Link
            to="/dashboard/manage-return-cars"
            className="flex items-center p-2 hover:bg-gray-700 rounded-md"
          >
            <FaCar className="mr-2" />
            <span>Manage Return Cars</span>
          </Link>
          <Link
            to="/dashboard/user-management"
            className="flex items-center p-2 hover:bg-gray-700 rounded-md"
          >
            <FiUsers className="mr-2" />
            <span>User Management</span>
          </Link>
        </nav>
      </div>

      {/* Content */}

{
  !isSidebarOpen &&
      <div className=" absolute left-0 p-2">
        <button
          className="toggle-button 2xl:hidden bg-gray-800 text-white p-2 rounded-md"
          onClick={toggleSidebar}
        >
         Menu
        </button>
      </div>
}

    </div>
  );
}

export default AdminDash;
