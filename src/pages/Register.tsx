import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { postNew } from "../common/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVer, setPasswordVer] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("id"))
      navigate("/overview")
  })

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
    console.log("authorizing new account");

    await postNew("/api/v1/user", userData).then((result) => {
      sessionStorage.setItem("id", result?.data[0].id);
      sessionStorage.setItem("username", result?.data[0].username);
    });

    navigate("/overview");
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
