import { useState } from "react";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // handle register
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
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
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="mb-1 font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
