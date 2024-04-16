import { useEffect, useState } from "react";
import { getUserAuthenticate } from "../common/api";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState({ id: null });

  const navigate = useNavigate();

  const userData = {
    username: username,
    password: password,
  };

  useEffect(() => {
    // console.log("id", id)
    // console.log("loc sto", localStorage['userId'])
    // console.log("auth", auth)
    if (auth.id) navigate("/overview");
  }, [auth, navigate]);

  const authenticateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    await getUserAuthenticate(
      `/api/v1/user/${userData.username}/${userData.password}`
    ).then((result) => {
      setAuth(result?.data[0]);
    });
  };

  useEffect(() => {
    if (auth.id) {
      localStorage["userId"] = auth.id;
      cleanUp();
      navigate("/account");
    } else console.log("WRONG PASSWORD");
  }, [auth, navigate]);

  const cleanUp = () => {
    setAuth({ id: null });
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <form onSubmit={authenticateUser}>
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
          <input type="submit" />
        </div>
      </form>

      <a href="/register">Create an account</a>
    </>
  );
};

export default LogIn;
