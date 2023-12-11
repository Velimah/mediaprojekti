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
      <article className="w-full h-auto md:h-[calc(100vh-11rem)] flex flex-col items-center justify-center md:py-4">
      <section className='overflow-hidden flex flex-col w-full md:w-[35rem]'>
        {toggle ? <LoginForm /> : <RegisterForm setToggle={setToggle}/>}
        <button
          className="bg-ai-black-100 text-ai-primary rounded-b-md pb-4 hover:text-white hover:font-bold transition-colors"
          onClick={toggleForms}
        >
          {toggle ? "Don't have account? Register now!" : "Already got account? Login now!"}
        </button>
        </section>
      </article>
    </>
  );
};

export default Login;
