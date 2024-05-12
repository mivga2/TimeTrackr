import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getUserAuthenticate,
  postNewUser,
  fetchAllUserdata,
} from "../../common/api";
import { useNavigate, useOutletContext } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVer, setPasswordVer] = useState("");
  const token = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/overview");
  });

  const userData = {
    id: "",
    username: username,
    salt: "random",
    password: password,
    disabled: false,
  };

  const verifyForm = () => {
    if (password != passwordVer) return false;

    return true;
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verifyForm) return false;

    userData.id = uuidv4();
    console.log("authorizing new account");

    await fetchAllUserdata(`/api/v1/user/name/${userData.username}`).then(
      (result) => {
        if (result?.data[0]) {
          setError("Username already exists!");
          return;
        } else {
          setError("");
        }
      }
    );

    await postNewUser("/api/v1/user", userData).then((result) => {
      console.log("New user created");
    });

    await getUserAuthenticate(
      `/api/v1/user/${userData.username}/${userData.password}`
    ).then((result) => {
      console.log(result?.data);
      localStorage.setItem("userId", result?.data[0].id);
      localStorage.setItem("username", result?.data[0].username);
      localStorage.setItem("token", result?.data[1].token);
    });

    console.log(localStorage);
    // cleanUp();
    navigate("/overview");
  };

  return (
    <>
      <p>{error}</p>
      <form onSubmit={createUser}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Verify password:
            <input
              type="password"
              value={passwordVer}
              onChange={(e) => setPasswordVer(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </>
  );
};

export default Register;
