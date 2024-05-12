import { useEffect, useState } from "react";
import { getUserAuthenticate } from "../../common/api";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const userData = {
    username: username,
    password: password,
  };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/overview");
  }, [navigate]);

  const authenticateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await getUserAuthenticate(
        `/api/v1/user/${userData.username}/${userData.password}`
      ).then((result) => {
        console.log(result?.data);
        localStorage.setItem("userId", result?.data[0].id);
        localStorage.setItem("username", result?.data[0].username);
        localStorage.setItem("token", result?.data[1].token);

        cleanUp();
        navigate("/overview");
      });
    } catch (error) {
      localStorage.removeItem("token");
      setError("Wrong username or password!");
    }
  };

  const cleanUp = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div>
        <p>{error}</p>
      </div>
      <form onSubmit={authenticateUser}>
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
          <input type="submit" />
        </div>
      </form>
      <a href="/register">Create an account</a>
    </>
  );
};

export default LogIn;
