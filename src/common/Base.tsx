import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Base = () => {
  return (
    <>
      <Navigation />
      <div className="router-view">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Base;
