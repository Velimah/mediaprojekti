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
      <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-800 bg-opacity-50">
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
