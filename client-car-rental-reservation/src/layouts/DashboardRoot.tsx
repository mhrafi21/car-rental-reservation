import { Outlet, ScrollRestoration } from "react-router-dom";
import DashboardHeader from "../pages/Dashboard/DashboardHeader/DashboardHeader";
import Header from "../components/Header/Header";

const DashboardRoot = () => {
  return (
    <div>
      <Header></Header>
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
