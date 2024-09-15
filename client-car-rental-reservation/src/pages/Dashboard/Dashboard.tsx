import React from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { TUser } from "../../interfaces";

const Dashboard: React.FC = () => {
  const user : TUser = useAppSelector(useCurrentUser);

  return (
    <div className="">
      {user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
