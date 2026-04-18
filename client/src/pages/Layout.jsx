import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/home/Navbar";
import Loader from "../assets/templates/Loader";
import Login from "./Login";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);

  // Layout acts like a lightweight route guard.
  // App.jsx first checks token validity, then Layout decides what to render.
  if (loading) {
    return <Loader />;
  }

  // If not logged in → show login page
  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
