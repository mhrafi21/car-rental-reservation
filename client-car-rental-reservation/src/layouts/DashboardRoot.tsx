import { Outlet, ScrollRestoration } from "react-router-dom";
import DashboardHeader from "../pages/Dashboard/DashboardHeader/DashboardHeader";
import Header from "../components/Header/Header";

const DashboardRoot = () => {
  return (
    <div>
      <Header></Header>
      <ScrollRestoration />
        <div className="md:flex">

     
        <div className="flex-1"> <DashboardHeader /></div>
        <div className="flex-auto">
        <Outlet />
    
       </div>

        </div>
    </div>
  );
};

export default DashboardRoot;
