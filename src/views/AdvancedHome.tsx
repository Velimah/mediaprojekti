import React, { useState } from "react";
import { useChatGPT } from "../hooks/ApiHooks";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { FormValues } from "../utils/Prompts";
import { getHtmlBlock } from "../utils/PromptFunctions";
import AlertDialog from "../components/AlertDialog";



const AdvancedHome = () => {

  const { getNavigation, getFooter, getHead, getTable, getWelcome, getMainSection } = getHtmlBlock();
  const { postQuestion, loading } = useChatGPT();
  const [newQuestion, setNewQuestion] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showAlertDialog, setShowAlertDialog] = useState(false);

	const [formValues, setFormValues] = useState<FormValues>({
    topic: "rpg games",
    cssLibrary: "tailwind",
    colors: "#88A0A8",
    linkCount: "4",
    linkNames: "Welcome,Main,Table,Footer",
    welcomeParagraphCount: "3",
    wordCount: "200",
    tableDetails: "Create a table with information about the topic",
    mainParagraphCount: "3",
    mainWordCount: "200",
  });

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

		console.log('formValues', formValues);

    const htmlArray: string[] = [];

    const firstSlot = `<!DOCTYPE html>
    <html lang="en">
    <body>
    `;
          localStorage.setItem('firstSlot', firstSlot);
          const lastSlot = `
    </body>
    </html>`;
          localStorage.setItem('lastSlot', lastSlot);

    try {
      const data1 = await getNavigation(formValues) || "";
      htmlArray.push(data1);
      const data2 = await getWelcome(formValues) || "";
      htmlArray.push(data2);
      const data3 = await getMainSection(formValues) || "";
      htmlArray.push(data3);
      const data4 = await getTable(formValues) || "";
      htmlArray.push(data4);
      const data5 = await getFooter(formValues) || "";
      htmlArray.push(data5);
      const completeArray = htmlArray.join('');
      await getHead(formValues, completeArray);

    } catch (e) {
      console.log("error: ", e);
    } finally {
      navigate("/advancedresult", { state: { formValues } });
    }
  };

    // Toggle alert dialog on and off
    const handleToggleDialog = () => {
      setShowAlertDialog((prev) => !prev);
    };  

  return (
    <>
    {showAlertDialog && (<AlertDialog content={error} onClose={handleToggleDialog} />)}
      <article className="w-full flex items-center justify-center">
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
              onSubmit={handleForm}
            >
                            <label className="relative"> Topic
                <input
                  id="topic"
                  type="text"
                  placeholder="Give me a topic for website ..."
                  value={formValues.topic}
                  onChange={(e) => setFormValues({ ...formValues, topic: e.target.value })}
                  className="rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<label className="relative"> Number of nav links
								<select
                      id="linkCount"
                      className="w-full rounded-md bg-white p-2"
											onChange={(e) => setFormValues({ ...formValues, linkCount: e.target.value })}
											defaultValue={4}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
											<option value="3">3</option>
                      <option value="4">4</option>
                </select>			
								</label>
								<label className="relative"> Nav link names
								<input
                  id="linkNames"
                  type="text"
                  placeholder="Give me navigation link names ..."
                  value={formValues.linkNames}
									onChange={(e) => setFormValues({ ...formValues, linkNames: e.target.value })}
                  className="rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<label className="relative"> Welcome section paragraph count
								<select
                      id="welcomeParagraphCount"
                      className="w-full rounded-md bg-white p-2"
											onChange={(e) => setFormValues({ ...formValues, welcomeParagraphCount: e.target.value })}
											defaultValue={2}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
											<option value="3">3</option>
                      <option value="4">4</option>
                </select>
								</label>
								<label className="relative"> Welcome section word count
								<input
                  id="wordCount"
                  type="text"
                  placeholder="Give me welcome section word count..."
                  value={formValues.wordCount}
                  onChange={(e) => setFormValues({ ...formValues, wordCount: e.target.value })}
                  className="rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<label className="relative"> Main section paragraph count
								<select
                      id="mainParagraphCount"
                      className="w-full rounded-md bg-white p-2"
											onChange={(e) => setFormValues({ ...formValues, mainParagraphCount: e.target.value })}
											defaultValue={3}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
											<option value="3">3</option>
                      <option value="4">4</option>
                </select>
								</label>
								<label className="relative"> Main section word count
								<input
                  id="mainWordCount"
                  type="text"
                  placeholder="Give me main section word count ..."
                  value={formValues.mainWordCount}
                  onChange={(e) => setFormValues({ ...formValues, mainWordCount: e.target.value })}
                  className="rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<label className="relative"> Tables section details
								<input
                  id="tableDetails"
                  type="text"
                  placeholder="Give me table section details ..."
                  value={formValues.tableDetails}
                  onChange={(e) => setFormValues({ ...formValues, tableDetails: e.target.value })}
                  className="rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
              <div className="flex py-4 md:flex-row flex-col items-stretch md:items-center">
                <div>
                  <label className="flex flex-row pb-2">
                    <span className="pr-2 font-bold">CSS:</span>
                    <select
                      id="userPromptCSS"
                      className="w-full rounded-md bg-white pl-1"
											onChange={(e) => setFormValues({ ...formValues, cssLibrary: e.target.value })}
                    >
                      <option value="Tailwind">Tailwind</option>
											<option value="Bootstrap">Bootstrap</option>
											<option value="Materialize">Materialize</option>
											<option value="Bulma">Bulma</option>
											<option value="Foundation">Foundation</option>
                      <option value="Vanilla">Vanilla</option>
                    </select>			
                  </label>
                  <label className="flex flex-row items-center">
                    <span className="pr-2 font-bold">Primary color:</span>
                    <input type="color" id="userPromptColor" className="grow" onChange={(e) => setFormValues({ ...formValues, colors: e.target.value })}/>
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
            <button className="rounded-md bg-black text-white p-3 w-full hover:bg-white hover:text-black hover:border-2 hover:border-black font-bold" onClick={() => navigate("/")}>Home</button>
          </section>
        </section>
        {loading && <Loader />}
      </article>
    </>
  );

}

export default AdvancedHome;