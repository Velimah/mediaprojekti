import { useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";

const Account: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // If no user is logged in, redirect to the home page
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if(user) {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/user/capture");
        if (response.ok) {
          const buffer = await response.arrayBuffer();
          const base64String = arrayBufferToBase64(buffer);
          setImageSrc(`data:image/png;base64,${base64String}`);
          setIsLoading(false);
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }
  }, [user]);

  // Function to convert array buffer to base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

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
        {/* TODO: loop through saved items */}
        <div className="flex flex-wrap space-b  p-4 rounded-lg shadow-md bg-black text-center justify-center md:justify-start">
          <div className="m-2 bg-gray-700 min-h-[300px] h-[300px] w-[300px] rounded-lg">
            <div className="bg-slate-600 h-[80%] rounded-t-lg">
              {isLoading ? (
                <div className="text-white flex items-center justify-center">
                  Loading...
                </div>
              ) : (
                imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Captured"
                    className="min-h-[80%] bg-slate-600 h-full w-full rounded-t-lg overflow-hidden"
                  />
                )
              )}
            </div>
            <p className="text-white font-bold">Placeholder Name</p>
          </div>
          <div className="m-2 bg-gray-700 min-h-[300px] h-[300px] w-[300px] rounded-lg">
            <div className="bg-slate-600 h-[80%] rounded-t-lg">
              {isLoading ? (
                <div className="text-white flex items-center justify-center">
                  Loading...
                </div>
              ) : (
                imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Captured"
                    className="min-h-[80%] bg-slate-600 h-full w-full rounded-t-lg overflow-hidden"
                  />
                )
              )}
            </div>
            <p className="text-white font-bold">Placeholder Name</p>
          </div>
          <div className="m-2 bg-gray-700 min-h-[300px] h-[300px] w-[300px] rounded-lg">
            <div className="bg-slate-600 h-[80%] rounded-t-lg">
              {isLoading ? (
                <div className="text-white flex items-center justify-center">
                  Loading...
                </div>
              ) : (
                imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Captured"
                    className="min-h-[80%] bg-slate-600 h-full w-full rounded-t-lg overflow-hidden"
                  />
                )
              )}
            </div>
            <p className="text-white font-bold">Placeholder Name</p>
          </div>
          <div className="m-2 bg-gray-700 min-h-[300px] h-[300px] w-[300px] rounded-lg">
            <div className="bg-slate-600 h-[80%] rounded-t-lg">
              {isLoading ? (
                <div className="text-white flex items-center justify-center">
                  Loading...
                </div>
              ) : (
                imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Captured"
                    className="min-h-[80%] bg-slate-600 h-full w-full rounded-t-lg overflow-hidden"
                  />
                )
              )}
            </div>
            <p className="text-white font-bold">Placeholder Name</p>
          </div>
        </div>
      </div>
      {/* ))} */}
    </div>
  ) : null;
};

export default Account;
