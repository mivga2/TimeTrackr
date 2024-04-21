import { useState, useEffect } from "react";
import { deleteOne, fetchOne } from "../common/api";
import { useNavigate } from "react-router-dom";
import { getActiveUserId, setActiveUserId } from "./LogIn";

const Account = () => {
  const [user, setUser] = useState({ username: "" });
  const id = getActiveUserId();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOne(`/api/v1/user/${id}`).then((result) => {
      setUser(result?.data[0]);
    });
  }, [id]);

  console.log(user);

  const userData = {
    username: user.username,
  };

  const logOut = () => {
    setActiveUserId('')
    navigate("/");
  };

  const deleteAccount = () => {
    deleteOne(`/api/v1/user/${id}`);
    //localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div>
      {/* <Table title="Friends list" columns={columns} data={data} /> */}
      {userData.username}

      <button onClick={logOut}>Log Out</button>
      <button onClick={deleteAccount}>DELETE</button>
    </div>
  );
};

export default Account;
