import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { WebsiteData, useUsers } from "../hooks/UserApiHooks";
import ProtectedComponent from "../components/ProtectedComponent";
import { useNavigate } from 'react-router-dom';
import { ChatState } from "../contexts/ChatContext";

const Account: React.FC = () => {
  const { getUsersSavedWebsites } = useUsers();
  const { user } = useUser();
  const [usersData, setUsersData] = useState<WebsiteData[]>([]);
  const [fetchedUsersData, setFetchedUsersData] = useState<WebsiteData[]>([]);
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

      getSavedWebsiteData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (JSON.stringify(fetchedUsersData) !== JSON.stringify(usersData)) {
      setUsersData(fetchedUsersData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedUsersData]);

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

  return (
    <ProtectedComponent hasAuth={
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
          <div id={data._id} key={data._id} className="savedbuild cursor-pointer m-2 bg-gray-700 min-h-[300px] h-[300px] w-[300px] rounded-lg border border-slate-700"
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
                    className="min-h-[80%] bg-slate-600 h-full w-full rounded-t-lg overflow-hidden"
                  />
                )
              )}
            </div>
            <p className="text-white font-bold">{data.name}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
    } noAuth={<></>}/>
  );
};

export default Account;
