import { useState } from "react";
import { UserData, useUsers } from "../hooks/UserApiHooks";
import { useUser } from "../contexts/UserContext";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";

const LoginForm: React.FC = () => {
  const { loginUser, loading } = useUsers();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useUser();
  const navigate = useNavigate();
  const {setNotification} = useNotification();


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: add better validators/sanitize inputs
    e.preventDefault();
    try {
      if (!username || !password) {
        console.log("Username/password cannot be empty");
        return;
      } else {
        const data: UserData = await loginUser(username, password);
        console.log("logindata : ", data);
        if (data.accessToken) {
          setUser(data);
          setNotification("default", "Logged in")
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error in handleLogin: ", error);
    }
  };

  return (
    <div className="bg-ai-black-100 p-8 rounded-lg shadow-3xl text-white">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="primary-btn w-full text-white px-4 py-2 rounded-md transition duration-300"
        >
          Login
        </button>
      </form>
      {loading && <Loader />}
    </div>
  );
};

export default LoginForm;
