import { useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";

const Account: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // If no user is logged in, redirect to the home page
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return user ? (
    <div className="bg-ai-black-100 p-8 rounded-lg shadow-3xl text-white w-full lg:w-3/4 px-4 m-5">
      <div className="my-4">
        <h2 className="text-2xl font-bold mb-4">Account</h2>
        <div className="placeholder flex flex-wrap space-b  p-4 rounded-lg shadow-md bg-black text-center justify-center md:justify-start">
          <p>username: {user?.username}</p>
        </div>
      </div>
      <div className="my-4">
        <h2 className="text-2xl font-bold mb-4">Saved builds</h2>
        {/* TODO: loop through save items */}
        <div className="placeholder flex flex-wrap space-b  p-4 rounded-lg shadow-md bg-black text-center justify-center md:justify-start">
          <div className="m-2 bg-gray-700 h-[100px] w-[300px]">
            <p className="text-white font-bold">Placeholder Name</p>
          </div>
          <div className="m-2 bg-gray-700 h-[100px] w-[300px]">
            <p className="text-white font-bold">Placeholder Name</p>
          </div>
          <div className="m-2 bg-gray-700 h-[100px] w-[300px]">
            <p className="text-white font-bold">Placeholder Name</p>
          </div>
          <div className="m-2 bg-gray-700 h-[100px] w-[300px]">
            <p className="text-white font-bold">Placeholder Name</p>
          </div>
          <div className="m-2 bg-gray-700 h-[100px] w-[300px]">
            <p className="text-white font-bold">Placeholder Name</p>
          </div>
        </div>
      </div>
      {/* ))} */}
    </div>
  ) : null;
};

export default Account;
