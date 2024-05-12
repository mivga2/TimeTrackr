import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import NoPermission from "./NoPermission";

const Base = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false);
  }, []);

  if (loading || !token) {
    return (
      <>
        <NoPermission />
      </>
    );
  }
  return (
    <>
      <Navigation />
      <div className="router-view">
        <Outlet />
      </div>
    </>
  );
};

export default Base;
