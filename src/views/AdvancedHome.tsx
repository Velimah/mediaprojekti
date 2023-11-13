import React, { useState } from "react";
import { useChatGPT } from "../hooks/ApiHooks";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { PromptTemplate, getPromptTemplate, FormValues } from "../utils/Prompts";
import { useChat } from "../contexts/ChatContext";

function removeHtmlMarkdown(inputString: string) {
  return inputString.replace(/```html|```/g, '');
}

const AdvancedHome = () => {
	const { dispatch } = useChat();
  const { postQuestion, loading } = useChatGPT();
  const navigate = useNavigate();
	const [formValues, setFormValues] = useState<FormValues>({
    topic: "rpg games",
    cssLibrary: "tailwind",
    colors: "#88A0A8, #B4CEB3, #DBD3C9",
    linkCount: "3",
    linkNames: "Home,About,Contact",
    heroParagraphCount: "3",
    wordCount: "300",
    tableDetails: "Create a 6x4 table with information about the topic",
    mainParagraphCount: "3",
    mainWordCount: "300",
  });


  const handleForm = async (e: React.FormEvent) => {
		const htmlArray: string[] = [];
    e.preventDefault();

		const selectedTemplate: PromptTemplate = 'createNavigation';
		const selectedTemplate2: PromptTemplate = 'createHeroSection';
		const selectedTemplate3: PromptTemplate = 'createMainSection';
		const selectedTemplate4: PromptTemplate = 'createTableSection';
		const selectedTemplate5: PromptTemplate = 'createFooter';
		const generatedPrompt = getPromptTemplate(selectedTemplate, formValues);
		const generatedPrompt2 = getPromptTemplate(selectedTemplate2, formValues);
		const generatedPrompt3 = getPromptTemplate(selectedTemplate3, formValues);
		const generatedPrompt4 = getPromptTemplate(selectedTemplate4, formValues);
		const generatedPrompt5 = getPromptTemplate(selectedTemplate5, formValues);

		console.log('formValues', formValues);

    try {
      const data = await postQuestion("html_block", generatedPrompt);
			const newData = removeHtmlMarkdown(data);
			console.log('newData', newData);
			htmlArray.push(newData);

			const data2 = await postQuestion("html_block", generatedPrompt2);
			const newData2 = removeHtmlMarkdown(data2);
			console.log('newData2', newData2);
			htmlArray.push(newData2);

			const data3 = await postQuestion("html_block", generatedPrompt3);
			const newData3 = removeHtmlMarkdown(data3);
			console.log('newData3', newData3);
			htmlArray.push(newData3);

			const data4 = await postQuestion("html_block", generatedPrompt4);
			const newData4 = removeHtmlMarkdown(data4);
			console.log('newData4', newData4);
			htmlArray.push(newData4);

			const data5 = await postQuestion("html_block", generatedPrompt5);
			const newData5 = removeHtmlMarkdown(data5);
			console.log('newData5', newData5);
			htmlArray.push(newData5);

      htmlArray.unshift(`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
        <title></title>
      </head>
      <body>`);
    // Add a string to the last spot
    htmlArray.push(`</body>
		</html>`);

    const htmlString = htmlArray.join('');
		console.log(htmlString);
		dispatch({ type: "SET_ANSWER", payload: htmlString });

    } catch (e) {
      console.log("error: ", e);
    } finally {
      navigate("/result");
    }
  };

  return (
    <>
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
                  className="mb-2 rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<label className="relative"> Number of nav links
								<input
                  id="linkCount"
                  type="text"
                  placeholder="Give me navigation link count..."
                  value={formValues.linkCount}
                  onChange={(e) => setFormValues({ ...formValues, linkCount: e.target.value })}
                  className="mb-2 rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<label className="relative"> Nav link names
								<input
                  id="linkNames"
                  type="text"
                  placeholder="Give me navigation link names ..."
                  value={formValues.linkNames}
									onChange={(e) => setFormValues({ ...formValues, linkNames: e.target.value })}
                  className="mb-2 rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<label className="relative"> Hero section paragraph count
								<input
                  id="heroParagraphCount"
                  type="text"
                  placeholder="Give me hero paragraph count ..."
                  value={formValues.heroParagraphCount}
                  onChange={(e) => setFormValues({ ...formValues, heroParagraphCount: e.target.value })}
                  className="mb-2 rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<label className="relative"> Hero section word count
								<input
                  id="wordCount"
                  type="text"
                  placeholder="Give me hero section word count..."
                  value={formValues.wordCount}
                  onChange={(e) => setFormValues({ ...formValues, wordCount: e.target.value })}
                  className="mb-2 rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<label className="relative"> Main section paragraph count
								<input
                  id="mainParagraphCount"
                  type="text"
                  placeholder="Give me main section paragraph count ..."
                  value={formValues.mainParagraphCount}
                  onChange={(e) => setFormValues({ ...formValues, mainParagraphCount: e.target.value })}
                  className="mb-2 rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
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
                  className="mb-2 rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
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
                      <option value="tailwind">Tailwind</option>
                      <option value="vanilla">Vanilla</option>
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
          </section>
        </section>
        {loading && <Loader />}
      </article>
    </>
  );
};

export default AdvancedHome;