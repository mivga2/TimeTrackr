import { deleteOne } from "../../common/api";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const deleteAccount = () => {
    deleteOne(`/api/v1/user/${id}`);
    logOut();
  };

  return (
    <div>
      <p>{localStorage.getItem("username")}</p>

      <button onClick={logOut}>Log Out</button>
      <button onClick={deleteAccount}>DELETE</button>
    </div>
  );
};

export default Account;
