import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { WebsiteData, advancedWebsiteData, useUsers } from "../hooks/UserApiHooks";
import ProtectedComponent from "../components/ProtectedComponent";
import { useNavigate } from 'react-router-dom';
import { ChatState } from "../contexts/ChatContext";
import { FormValues } from "../utils/Prompts";

const Account: React.FC = () => {
  const { getUsersSavedWebsites, getUsersAdvancedSavedWebsites, deleteUsersSavedWebsite,deleteUsersSavedAdvancedWebsite } = useUsers();
  const { user } = useUser();

  const [usersData, setUsersData] = useState<WebsiteData[]>([]);
  const [fetchedUsersData, setFetchedUsersData] = useState<WebsiteData[]>([]);

  const [usersAdvancedData, setUsersAdvancedData] = useState<advancedWebsiteData[]>([]);
  const [fetchedUsersAdvancedData, setFetchedUsersAdvancedData] = useState<advancedWebsiteData[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const getSavedWebsiteData = async () => {
        try {
          setIsLoading(true);

          const usersSavedStuff = await getUsersSavedWebsites(user);
          setFetchedUsersData(usersSavedStuff);

          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching users saved data:", error);
        }
      };

      const getSavedAdvancedWebsiteData = async () => {
        try {
          setIsLoading(true);

          const usersAdvancedSavedStuff = await getUsersAdvancedSavedWebsites(user);
          setFetchedUsersAdvancedData(usersAdvancedSavedStuff);

          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching users saved data:", error);
        }
      };

      getSavedAdvancedWebsiteData();
      getSavedWebsiteData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (JSON.stringify(fetchedUsersData) !== JSON.stringify(usersData)) {
      setUsersData(fetchedUsersData);
    }
    if (JSON.stringify(fetchedUsersAdvancedData) !== JSON.stringify(usersAdvancedData)) {
      setUsersAdvancedData(fetchedUsersAdvancedData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedUsersData, fetchedUsersAdvancedData]);

  const selectItemClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    const selectedprojekti: WebsiteData | undefined = fetchedUsersData.find(
      (a) => a._id === id
    );
    if (selectedprojekti) {
      const state: ChatState = {
        question: selectedprojekti.originalPrompt,
        answer: selectedprojekti.html,
        editedanswer: "",
      };
      navigate("/result", { state: state });
    }
  };

  const selectAdvancedItemClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    const selectedprojekti: advancedWebsiteData | undefined = fetchedUsersAdvancedData.find(
      (a) => a._id === id
    );
    if (selectedprojekti) {
      const htmlstate = {
        formValues: {
          htmlArray: selectedprojekti.htmlarray,
          code: selectedprojekti.originalCode,
          cssLibrary: selectedprojekti.cssLibrary,
          colors: "",
          mapAddress: "",
          mapCity: "",
          additionalInfo: "",
          imageSrc: "",
        },
      };

      navigate("/advancedresult", { state: htmlstate });
    }
  };

  const handleDelete = async (id: string) => {
    if (user) {
      try {
        await deleteUsersSavedWebsite(id, user); 
        const updatedSavedStuff = await getUsersSavedWebsites(user);
        setFetchedUsersData(updatedSavedStuff);
      } catch (error) {
        console.error("Error deleting:", error);
      }
    } else {
      console.log("user not found");
    }
  };

  const handleAdvancedDelete = async (id: string) => {
    if (user) {
      try {
        await deleteUsersSavedAdvancedWebsite(id, user); 
        const updatedSavedStuff = await getUsersAdvancedSavedWebsites(user);
        setFetchedUsersAdvancedData(updatedSavedStuff);
      } catch (error) {
        console.error("Error deleting:", error);
      }
    } else {
      console.log("user not found");
    }
  };
  return (
    <ProtectedComponent
      hasAuth={
        <div className="bg-ai-black-100 p-8 rounded-lg shadow-3xl text-white w-full lg:w-3/4 px-4 m-5">
          <div className="my-4">
            <h2 className="text-2xl font-bold mb-4">Account</h2>
            <div className="placeholder flex flex-wrap space-b  p-4 rounded-lg shadow-md bg-black text-center justify-center md:justify-start">
              <p>username: {user?.username}</p>
            </div>
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold mb-4">Saved builds</h2>
            <div className="flex flex-wrap space-b  p-4 rounded-lg shadow-md bg-black text-center justify-center md:justify-start">
              {usersData.map((data) => (
                <div className="m-2 relative">
                  <div
                    id={data._id}
                    key={data._id}
                    className="savedbuild cursor-pointer bg-gray-700 min-h-[300px] h-[300px] w-[300px] rounded-lg border-2 border-slate-700 overflow-hidden"
                    onClick={selectItemClick}
                  >
                    <div className="bg-slate-600 h-[80%] rounded-t-lg">
                      {isLoading ? (
                        <div className="text-white flex items-center justify-center">
                          Loading...
                        </div>
                      ) : (
                        data.previewimage && (
                          <img
                            src={`data:image/png;base64,${data.previewimage}`}
                            alt="Preview image"
                            className="min-h-[80%] bg-slate-600 h-full w-full rounded-t-lg overflow-hidden brightness-[0.45]"
                          />
                        )
                      )}
                    </div>
                    <p className="text-white font-bold break-words">{data.name}</p>
                  </div>
                  <div className="w-full">
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="group bg-red-500 m-2 absolute top-0 left-0 hover:bg-red-700 rounded-full border-gray-300 border p-1 font-bold arrow-path"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      <span className="opacity-0 group-hover:opacity-100 bg-black text-white text-xs py-1 px-2 rounded border border-gray-300 shadow-lg absolute bottom-1 left-10">
                        DELETE
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold mb-4">Saved advanced builds</h2>
            <div className="flex flex-wrap space-b  p-4 rounded-lg shadow-md bg-black text-center justify-center md:justify-start">
              {usersAdvancedData.map((data) => (
                <div className="m-2 relative">
                  <div
                    id={data._id}
                    key={data._id}
                    className="savedbuild cursor-pointer bg-gray-700 min-h-[300px] h-[300px] w-[300px] rounded-lg border-2 border-slate-700 overflow-hidden"
                    onClick={selectAdvancedItemClick}
                  >
                    <div className="bg-slate-600 h-[80%] rounded-t-lg">
                      {isLoading ? (
                        <div className="text-white flex items-center justify-center">
                          Loading...
                        </div>
                      ) : (
                        data.previewimage && (
                          <img
                            src={`data:image/png;base64,${data.previewimage}`}
                            alt="Preview image"
                            className="min-h-[80%] bg-slate-600 h-full w-full rounded-t-lg overflow-hidden brightness-[0.45]"
                          />
                        )
                      )}
                    </div>
                    <p className="text-white font-bold break-words">{data.name}</p>
                  </div>
                  <div className="w-full">
                    <button
                      onClick={() => handleAdvancedDelete(data._id)}
                      className="group bg-red-500 m-2 absolute top-0 left-0 hover:bg-red-700 rounded-full border-gray-300 border p-1 font-bold arrow-path"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      <span className="opacity-0 group-hover:opacity-100 bg-black text-white text-xs py-1 px-2 rounded border border-gray-300 shadow-lg absolute bottom-1 left-10">
                        DELETE
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      noAuth={<></>}
    />
  );
};

export default Account;