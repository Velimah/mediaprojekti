import { useState } from "react";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // handle login
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
