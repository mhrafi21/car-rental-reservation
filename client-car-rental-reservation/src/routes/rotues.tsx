import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ErrorPage from "../Error-page";
import HomePage from "../pages/Home/HomePage";
import AboutUsPage from "../pages/AboutUsPage";
import ProductsPage from "../pages/productPage/CarsPage";
import ProductManagementPage from "../pages/ProductManagement/ProductManagementPage";
import ProductDetailsPage from "../pages/productPage/ProductDetailsPage";
import CheckoutPage from "../pages/CheckOutPage/CheckoutPage";
import SuccessPage from "../pages/SuccessPage";
import CategoryProduct from "../pages/Home/CategoryProduct";
import Cart from "../pages/Cart/Cart";
import Signup from "../pages/SingupPage/Signup";
import Signin from "../pages/SigninPage/Signin";
import Booking from "../pages/Home/Booking/Booking";
import ProtectedRoutes from "../layouts/ProtectedRoutes";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyAccount from "../pages/Profile/MyAccount";
import ManageCars from "../pages/Dashboard/ManageCars/ManageCars";
import DashboardRoot from "../layouts/DashboardRoot";
import ManageBooking from "../pages/Dashboard/ManageBooking/ManageBooking";
import ManageReturnCars from "../pages/Dashboard/ManageReturnCars/ManageReturnCars";
import UserManagement from "../pages/Dashboard/AdminDash/UserManagement/UserManagement";
import Contact from "../pages/Contact/Contact";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product",
        element: <ProductsPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailsPage />,
      },

      {
        path: "/product-management",
        element: <ProductManagementPage />,
      },
      {
        path: "/booking",
        element: (
          <ProtectedRoutes>
            {" "}
            <Booking />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/category/:categoryName",
        element: <CategoryProduct></CategoryProduct>,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },

      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/my-account",
        element: (
          <ProtectedRoutes>
            {" "}
            <MyAccount />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardRoot></DashboardRoot>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <ProtectedRoutes><Dashboard /></ProtectedRoutes>,
      },
      {
        path: "/dashboard/manage-cars",
        element: <ProtectedRoutes><ManageCars /></ProtectedRoutes>
      },
      {
        path: "/dashboard/manage-bookings",
        element: <ProtectedRoutes><ManageBooking/></ProtectedRoutes>
      },
    {
      path: "/dashboard/manage-return-cars",
      element: <ProtectedRoutes>
       <ManageReturnCars />
      </ProtectedRoutes>
    },
    {
      path: "/dashboard/user-management",
      element: <ProtectedRoutes> <UserManagement /> </ProtectedRoutes>,
    }
      
    ]

  }
]);

export default router;
