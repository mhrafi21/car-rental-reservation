import React from 'react'
import { useAppSelector } from '../../../redux/hooks'
import { useCurrentUser } from '../../../redux/features/auth/authSlice'
import AdminDash from '../AdminDash/AdminDash';
import UserDash from '../UserDash/UserDash';
import { TUser } from '../../../interfaces';

const DashboardHeader: React.FC = () => {
    const user: TUser = useAppSelector(useCurrentUser);
  return (
    <div>
        {
            user?.role === "admin" ? <AdminDash></AdminDash> : <UserDash></UserDash>
        }
    </div>
  )
}

export default DashboardHeader