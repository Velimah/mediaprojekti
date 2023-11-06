import React, { useEffect, useState } from "react";
import { useChat } from "../contexts/ChatContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useChat();
  const [loading, setLoading] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const urli: string = "http://localhost:8000/gpt/completions";

  const askChatGPT = (e: React.FormEvent) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: newQuestion }),
    };

    e.preventDefault();
    if (newQuestion.trim() !== "") {
      dispatch({ type: "SET_QUESTION", payload: newQuestion });

      setLoading(true);

      fetch(urli, options)
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: "SET_ANSWER",
            payload: data.choices[0].message.content,
          });
        })
        .catch((error) => {
          console.error("API Error:", error);
        })
        .finally(() => {
          setLoading(false);
          navigate("/result");
        });
      setNewQuestion("");
    }
  };

  useEffect(() => {
    if (state.question) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: state.question }),
      };

      setLoading(true);

      fetch(urli, options)
        .then((response) => response.json())
        .then((data) => {
          console.log("answer:", data.choices[0].message.content);
          dispatch({
            type: "SET_ANSWER",
            payload: data.choices[0].message.content,
          });
        })
        .catch((error) => {
          console.error("API Error:", error);
        })
        .finally(() => {
          setLoading(false);
          navigate("/result");
        });
    }
  }, [state.question, dispatch, navigate]);

  return (
    <>
      <article className="w-screen h-[calc(100vh-5rem)] flex items-center justify-center">
        <section className="flex flex-col w-[35rem] bg-white rounded-md shadow-lg">
          <div id="header">
            <figure className="bg-gray-200 h-36 rounded-t-md">
              <img src="" alt="headerImg" />
            </figure>
          </div>
          <section className="flex flex-col">
            <div className="flex items-center px-4 py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-[70px] shrink-0 hover:animate-bounce"
              >
                <rect
                  x="5"
                  y="2"
                  width="14"
                  height="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="currentColor"
                />
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="currentColor"
                />
                <rect
                  x="5"
                  y="21"
                  width="4"
                  height="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="currentColor"
                />
                <rect
                  x="15"
                  y="21"
                  width="4"
                  height="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="currentColor"
                />
                <circle
                  cx="8.5"
                  cy="6.5"
                  r="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="white"
                  className="animate-pulse"
                />
                <circle
                  cx="15.5"
                  cy="6.5"
                  r="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="white"
                  className="animate-pulse"
                />
              </svg>
              <div className="ml-4 flex items-center">
                <span className="text-lg pr-4">:</span>
                <span className="bg-gray-200 p-3 rounded-md shrink">
                  Hello! How can I assist you in building your dream webpage
                  today?
                </span>
              </div>
            </div>
            <form
              className="bg-gray-200 p-4 rounded-b-md"
              onSubmit={askChatGPT}
            >
              <label className="relative">
                <input
                  id="userPrompt"
                  type="text"
                  placeholder="Give me a webpage with two div's next to each other ..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
                <span className="absolute left-0 top-0 px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="nonabsolutee"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                </span>
              </label>
              <div className="flex py-4 md:flex-row flex-col items-stretch md:items-center">
                <div>
                  <label className="flex flex-row pb-2">
                    <span className="pr-2 font-bold">CSS:</span>
                    <select
                      id="userPromptCSS"
                      className="w-full rounded-md bg-white pl-1"
                    >
                      <option value="bootstrap">Bootstrap</option>
                      <option value="vanilla">Vanilla</option>
                    </select>
                  </label>
                  <label className="flex flex-row items-center">
                    <span className="pr-2 font-bold">Primary color:</span>
                    <input type="color" id="userPromptColor" className="grow" />
                  </label>
                </div>
                <label className="grow pt-4 md:pl-4 md:pt-0">
                  <input
                    type="submit"
                    className="rounded-md bg-black text-white p-3 w-full hover:bg-white hover:text-black hover:border-2 hover:border-black font-bold"
                    value="BUILD!"
                  />
                </label>
              </div>
            </form>
          </section>
        </section>
        {loading && <Loader />}
      </article>
    </>
  );
};

export default Home;
