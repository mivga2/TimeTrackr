import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getUserAuthenticate,
  postNewUser,
  fetchAllUserdata,
} from "../../common/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Array<JSX.Element>>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVer, setPasswordVer] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/overview");
  });

  const userData = {
    id: "",
    username: username,
    salt: "random",
    password: password,
    disabled: false,
  };

  const verifyForm = () => {
    const errorsList: Array<JSX.Element> = [];
    if (password !== passwordVer)
      errorsList.push(<p key="ident">Passwords aren't identical.</p>);
    if (password.length < 8)
      errorsList.push(<p key="passLen">Password isn't long enough.</p>);
    if (username.length < 5)
      errorsList.push(<p key="nameLen">Username isn't long enough.</p>);
    setErrors(errorsList);

    return errorsList.length === 0;
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!verifyForm()) return false;

      userData.id = uuidv4();

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

      // creates a new user
      await postNewUser("/api/v1/user", userData);

      // logs in, this creates token
      await getUserAuthenticate(
        `/api/v1/user/${userData.username}/`,
        userData.password
      ).then((result) => {
        localStorage.setItem("username", result?.data[0].username);
        localStorage.setItem("token", result?.data[1].token);
      });

      navigate("/overview");
    } catch (error) {
      console.log("Wrong username or password.");
    }
  };

  return (
    <>
      <p>{error}</p>
      {errors}
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
              minLength={5}
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
              minLength={8}
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
              minLength={8}
            />
          </label>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
      <a href="/login">Already have an account? Log in</a>
    </>
  );
};

export default Register;
