import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { WebsiteData, advancedWebsiteData, useUsers } from "../hooks/UserApiHooks";
import ProtectedComponent from "../components/ProtectedComponent";
import { useNavigate } from 'react-router-dom';
import { ChatState } from "../contexts/ChatContext";
import { useNotification } from "../contexts/NotificationContext";

const Account: React.FC = () => {
  const { getUsersSavedWebsites, getUsersAdvancedSavedWebsites, deleteUsersSavedWebsite, deleteUsersSavedAdvancedWebsite } = useUsers();
  const { user } = useUser();
  const { setNotification } = useNotification();

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

  const selectItemClick = async (id: string) => {  
    const selectedprojekti: WebsiteData | undefined = fetchedUsersData.find(
      (a) => a._id === id
    );
    if (selectedprojekti) {
      const state: ChatState = {
        name: selectedprojekti.name,
        _id: selectedprojekti._id,
        question: selectedprojekti.originalPrompt,
        answer: selectedprojekti.html,
        editedanswer: "",
        cssLibrary:"",
        color:""
      };
      navigate("/result", { state: state });
    }
  };

  const selectAdvancedItemClick = async (id: string) => {  
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
          _id: selectedprojekti._id,
          name: selectedprojekti.name
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
        setNotification("default", "Deleted")
      } catch (error) {
        console.error("Error deleting:", error);
        setNotification("error", "Something went wrong while trying to delete")
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
        setNotification("default", "Deleted")
      } catch (error) {
        console.error("Error deleting:", error);
        setNotification("error", "Something went wrong while trying to delete")
      }
    } else {
      console.log("user not found");
    }
  };

  return (
    <ProtectedComponent
      hasAuth={
        <div className="rounded-lg shadow-3xl text-white w-full md:w-[800px] bg-gridBg bg-white bg-50 bg-center md:my-8">
          <div className="py-12 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-ai-black">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 ">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </h2>
            <div className="placeholder flex flex-wrap space-b p-4 rounded-lg shadow-md text-ai-black font-bold font-robot bg-ai-primary text-center justify-center md:justify-start">
              <p>{user?.username}</p>
            </div>
          </div>
          <div className="py-8 bg-ai-black">
            <h2 className="text-2xl font-bold mb-4 text-center">Saved builds</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 px-4 space-b rounded-lg text-center saved-builds">
              {usersData.map((data) => (
                <div className="relative" id={data._id} key={data._id} >
                  <div 
                    className="savedbuild cursor-pointer bg-white min-h-[220px] h-[220px] w-[220px] rounded-md border-2 border-ai-black hover:border-ai-primary transition-colors hover:font-bold overflow-hidden"
                    onClick={() => selectItemClick(data._id)}
                  >
                    <div className="h-[80%] rounded-t-lg">
                      {isLoading ? (
                        <div className="text-ai-black flex items-center justify-center font-robot font-bold h-full">
                          Loading...
                        </div>
                      ) : (
                        data.previewimage && (
                          <img
                            src={`data:image/png;base64,${data.previewimage}`}
                            alt="Preview image"
                            className="min-h-[80%] bg-slate-600 h-full object-cover w-full overflow-hidden brightness-[0.45] hover:brightness-75"
                          />
                        )
                      )}
                    </div>
                    <p className="group flex justify-center items-center min-h-[20%] break-words text-black py-2 font-robot break-words">
                      {data.name.length > 27 && (
                        <span className="opacity-0 group-hover:opacity-100 bg-zinc-800 text-white text-xs rounded p-1 absolute bottom-10 left-1/2 transform -translate-x-1/2 whitespace-wrap max-w-[110%] pointer-events-none border-zinc-400 border">
                          {data.name}
                        </span>
                      )}
                      {data.name}
                    </p>
                  </div>
                  <div className="w-full">
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="group bg-ai-secondary m-2 absolute top-0 left-0 hover:bg-ai-tertiary rounded-full p-1 font-bold arrow-path"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      <span className="opacity-0 group-hover:opacity-100 bg-black font-robot text-white text-xs py-1 px-2 rounded shadow-lg absolute bottom-1 left-10">
                        DELETE
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-8 bg-ai-black">
            <h2 className="text-2xl font-bold mb-4 text-center">Saved advanced builds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 space-b rounded-lg text-center saved-builds">
              {usersAdvancedData.map((data) => (
                <div className="m-2 relative" id={data._id} key={data._id} >
                  <div className="savedbuild cursor-pointer bg-white min-h-[220px] h-[220px] w-[220px] rounded-md border-2 border-ai-black hover:border-ai-primary hover:font-bold transition-colors overflow-hidden" 
                                     onClick={() => selectAdvancedItemClick(data._id)}>
                    <div className="h-[80%] rounded-t-lg">
                      {isLoading ? (
                        <div className="text-white flex items-center justify-center font-robot font-bold h-full">
                          Loading...
                        </div>
                      ) : (
                        data.previewimage && (
                          <img
                            src={`data:image/png;base64,${data.previewimage}`}
                            alt="Preview image"
                            className="min-h-[80%] bg-slate-600 h-full object-cover w-full overflow-hidden brightness-[0.45] hover:brightness-75"
                          />
                        )
                      )}
                    </div>
                    <p className="group flex justify-center items-center min-h-[20%] break-words text-ai-black py-2 font-robot break-words">
                      {data.name.length > 27 && (
                        <span className="opacity-0 group-hover:opacity-100 bg-zinc-800 text-white text-xs rounded p-1 absolute bottom-10 left-1/2 transform -translate-x-1/2 whitespace-wrap max-w-[110%] pointer-events-none border-zinc-400 border">
                          {data.name}
                        </span>
                      )}
                      {data.name}
                    </p>
                  </div>
                  <div className="w-full">
                    <button
                      onClick={() => handleAdvancedDelete(data._id)}
                      className="group bg-ai-secondary m-2 absolute top-0 left-0 hover:bg-ai-tertiary rounded-full p-1 font-bold arrow-path"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      <span className="opacity-0 group-hover:opacity-100 bg-black font-robot text-white text-xs py-1 px-2 rounded shadow-lg absolute bottom-1 left-10">
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