import { useState } from "react";
import { UserData, useUsers } from "../hooks/UserApiHooks";
import { useUser } from "../contexts/UserContext";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";
import AlertDialog from "../components/AlertDialog";

const LoginForm: React.FC = () => {
  const { loginUser, loading } = useUsers();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useUser();
  const navigate = useNavigate();
  const {setNotification} = useNotification();

  // show alert dialog
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: add better validators/sanitize inputs
    e.preventDefault();
    try {
      if (!username || !password) {
        setDialogContent('Username/password cannot be empty');
        setShowAlertDialog(true);
        return;
      } else {
        const data: UserData = await loginUser(username, password);
        if (data.accessToken) {
          setUser(data);
          setNotification("default", "Logged in")
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error in handleLogin: ", error);
      setDialogContent('There was an error, try again later');
      setShowAlertDialog(true);
    }
  };

  return (
    <>
    {showAlertDialog && <AlertDialog content={dialogContent} onClose={() => setShowAlertDialog((prev) => !prev)} />}
    <div className="bg-ai-black-100 p-8 rounded-t-md shadow-3xl text-white">
      <h2 className="text-2xl font-bold mb-4 text-center font-robot">Login</h2>
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
            className="rounded-md border-ai-black text-ai-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-ai-primary focus:ring-ai-primary focus:ring-2 w-full"
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
            className="rounded-md border-ai-black text-ai-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-ai-primary focus:ring-ai-primary focus:ring-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="primary-btn"
        >
          Login
        </button>
      </form>
      {loading && <Loader />}
    </div>
    </>
  );
};

export default LoginForm;
