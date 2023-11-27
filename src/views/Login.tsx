import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [toggle, setToggle] = useState(true);

  const toggleForms = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="w-full min-h-full flex flex-col justify-center items-center">
        {toggle ? <LoginForm /> : <RegisterForm />}
        <button
          className="bg-black hover:bg-gray-800 text-white font-bold text-xs py-2 px-4 rounded m-1"
          onClick={toggleForms}
        >
          {toggle ? "Don't have account? Register now!" : "Already got account? Login now!"}
        </button>
      </div>
    </>
  );
};

export default Login;
