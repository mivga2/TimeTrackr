import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { postNew } from "../common/api";
import { useNavigate } from "react-router-dom";
import { setActiveUserId } from "./LogIn";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVer, setPasswordVer] = useState("");

  const navigate = useNavigate();

  const userData = {
    id: "",
    username: username,
    salt: "random",
    password: password,
    disabled: false,
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();

    userData.id = uuidv4();
    setActiveUserId(userData.id);

    await postNew("/api/v1/user", userData);

    navigate("/account");
  };

  return (
    <>
      <form onSubmit={createUser}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
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
