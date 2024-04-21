import { useEffect, useState } from "react";
import { getUserAuthenticate } from "../common/api";
import { useNavigate } from "react-router-dom";

export let _activeUserId = ''
export const getActiveUserId = function() {
  return _activeUserId;
};
export const setActiveUserId = function(name : string) {
  //validate the name...
  _activeUserId = name;
};

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState({ id: '' });

  const navigate = useNavigate();

  const userData = {
    username: username,
    password: password,
  };

  useEffect(() => {
    // console.log("id", id)
    // console.log("loc sto", localStorage['userId'])
    // console.log("auth", auth)
    if (getActiveUserId()) navigate("/overview");
  }, [navigate]);

  const authenticateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    await getUserAuthenticate(
      `/api/v1/user/${userData.username}/${userData.password}`
    ).then((result) => {
      setAuth(result?.data[0]);
    });
  };

  useEffect(() => {
    if (auth?.id || getActiveUserId()) {
      setActiveUserId(auth.id);
      cleanUp();
      navigate("/account");
    } else console.log("WRONG PASSWORD");
  }, [auth, navigate]);

  const cleanUp = () => {
    setAuth({ id: '' });
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
