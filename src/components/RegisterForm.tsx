import { useState } from "react";
import { useUsers } from "../hooks/UserApiHooks";
import { useNotification } from "../contexts/NotificationContext";
import Loader from "./Loader";

interface RegisterFormProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setToggle }) => {
  const { setNotification } = useNotification();
  const { registerUser, loading } = useUsers();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: add better validators/sanitize inputs
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setNotification("error", "Passwords do not match!");
        return;
      } else {
        const data = await registerUser(username, password);
        console.log("userdata: ", data);
        setNotification("default", "User registered successfully!");
        setToggle(true);
      }
    } catch (error) {
      console.log("error in handleRegister: ", error);
    }
  };

  return (
    <div className="bg-ai-black-100 p-8 rounded-lg shadow-3xl text-white">
      <h2 className="text-2xl font-bold mb-4 text-center font-robot">Register</h2>
      <form className="space-y-4" onSubmit={handleRegister}>
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="... peer rounded-md border-ai-black text-ai-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-ai-primary focus:ring-ai-primary focus:ring-2 w-full"
            required
            pattern=".{1,}"
          />
          <span className="mt-2 hidden text-sm text-ai-tertiary peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Username can't be empty
          </span>
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
            className="... peer rounded-md border-ai-black text-ai-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-ai-primary focus:ring-ai-primary focus:ring-2 w-full"
            required
            pattern=".{7,}"
          />
          <span className="mt-2 hidden text-sm text-ai-tertiary peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Password should be at least 7 letters
          </span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="mb-1 font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="... peer rounded-md border-ai-black text-ai-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-ai-primary focus:ring-ai-primary focus:ring-2 w-full"
            required
            pattern=".{7,}"
          />
          <span className="mt-2 hidden text-sm text-ai-tertiary peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Password should be at least 7 letters
          </span>
        </div>
        <button
          type="submit"
          className="primary-btn"
        >
          Register
        </button>
      </form>
      {loading && <Loader />}
    </div>
  );
};

export default RegisterForm;
