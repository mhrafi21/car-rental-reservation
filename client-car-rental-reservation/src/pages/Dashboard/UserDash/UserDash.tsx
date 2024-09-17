
import { Link } from 'react-router-dom';

function UserDash() {
  return (
    <nav>
    <ul>
      <li className="mb-4">
        <Link to="/dashboard" className="text-gray-300 hover:text-white">
          Overview
        </Link>
      </li>
      <li className="mb-4">
        <Link to="/dashboard/my-account" className="text-gray-300 hover:text-white">
          My Profile
        </Link>
      </li>
      <li className="mb-4">
        <Link
          to="/dashboard/my-bookings"
          className="text-gray-300 hover:text-white"
        >
          Manage Booking Car
        </Link>
      </li>
    </ul>
  </nav>
  )
}

export default UserDash;
