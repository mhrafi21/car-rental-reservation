import { Outlet, ScrollRestoration } from "react-router-dom";
import DashboardHeader from "../pages/Dashboard/DashboardHeader/DashboardHeader";


const DashboardRoot = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className="">
        <div className="">
          {" "}
          <DashboardHeader />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardRoot;
