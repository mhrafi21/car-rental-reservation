import { FaCar, FaClipboardList } from "react-icons/fa";
import {  FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

function AdminDash() {
  return (
    <nav>
      <ul>

      <li  className="mb-4">
        {" "}
        <Link to="/dashboard/manage-cars" className="text-gray-300 flex hover:text-white">
          <FaCar className="mr-2" />
          <span>Manage Cars</span>
        </Link>
      </li>
      <li  className="mb-4">
        {" "}
        <Link to="/dashboard/manage-bookings" className="text-gray-300 flex hover:text-white">
          <FaClipboardList className="mr-2" />
          <span>Manage Bookings</span>
        </Link>
      </li>
      <li  className="mb-4">
        {" "}
        <Link to="/dashboard/manage-return-cars" className="text-gray-300 flex hover:text-white">
          <FaCar className="mr-2" />
          <span>Manage Return Cars</span>
        </Link>
      </li>
      <li  className="mb-4">
        <Link to="/dashboard/user-management" className="text-gray-300 flex hover:text-white">
          <FiUsers className="mr-2" />
          <span>User Management</span>
        </Link>
      </li>
      </ul>
      
    </nav>
  );
}

export default AdminDash;
