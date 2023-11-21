import { FormValues, PromptTemplate, getPromptTemplate } from "./Prompts";
import { useChatGPT } from "../hooks/ApiHooks";
import { useState, useContext } from "react";
import { MediaContext } from "../contexts/MediaContext";

export type HtmlBlock = {
  id: string;
  content: string;
};

const PromptFunctions = () => {
  const { postQuestion } = useChatGPT();
  const [progressCount, setProgressCount] = useState<string>("0 / 7");
  const [errorCount, setErrorCount] = useState<number>(0);
  const { setHtmlArray } = useContext(MediaContext);

  // function to remove markdown from html. Use | to separate multiple markdowns
  const removeHtmlMarkdown = (inputString: string) => {
    return inputString.replace(/```html|```/g, "");
  };

  // function to wait until new line of code is generated input: ms = milliseconds
  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // create web page function, creates all html blocks and saves them to local storage
  const createWebPage = async (formValues: FormValues) => {
    setHtmlArray([]);

    // html block that contains the start of the document
    const documentStart = '<!DOCTYPE html>\n<html lang="en">\n<body style="margin: auto;">\n';

    // html block that contains the end of the document
    const documentEnd = "\n</body>\n</html>";

    //fetch all html blocks and save them to htmlArray array
    const createAndPushHtmlBlock = async (
      promptTemplate: PromptTemplate,
      formValues: FormValues,
      progressCount: string
    ) => {
      const blockData = (await createHtmlBlock(promptTemplate, formValues)) || "";

      if (blockData === "") {
        setErrorCount((prevError) => prevError + 1);
      }

      setProgressCount(progressCount);
      sleep(1000);

      return { id: promptTemplate, content: blockData };
    };

    try {
      const newArray: HtmlBlock[] = [
        { id: "documentStart", content: documentStart },
        await createAndPushHtmlBlock("createNavigation", formValues, "1 / 7"),
        await createAndPushHtmlBlock("createWelcomeSection", formValues, "2 / 7"),
        await createAndPushHtmlBlock("createMainSection", formValues, "3 / 7"),
        await createAndPushHtmlBlock("createTableSection", formValues, "4 / 7"),
        await createAndPushHtmlBlock("createMap", formValues, "5 / 7"),
        await createAndPushHtmlBlock("createFooter", formValues, "6 / 7"),
        { id: "documentEnd", content: documentEnd },
      ];

      const completeArrayString = newArray.map((block) => block.content).join("");
      const newHead = await createHeadInfo(formValues, completeArrayString);
      // checks if there is an old document start html block and removes it and replaces it with new one
      if (newArray.length > 0) {
        const firstContent = newArray[0].content;
        if (typeof firstContent === "string" && firstContent.startsWith("<!D")) {
          newArray.shift();
        }
      }
      if (newHead !== undefined) {
        newArray.unshift(newHead);
      }
      setHtmlArray(newArray);
      setProgressCount("0 / 7");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // function to create html block
  const createHtmlBlock = async (promptTemplate: PromptTemplate, formValues: FormValues): Promise<string> => {
    // gets the correct template for prompt and injects values from form into the template
    const createHtmlBlock = getPromptTemplate(promptTemplate, formValues);
    // fetch for the html block
    try {
      const htmlData = await postQuestion("html_block", createHtmlBlock);
      // removes markdown from htmlstring
      const sanitizedHtmlData = removeHtmlMarkdown(htmlData);

      // returns sanitized htmlstring
      return sanitizedHtmlData;
    } catch (error) {
      console.log("error: ", error);
      return "";
    }
  };

  // creates <head></head> info html block and saves it to local storage
  const createHeadInfo = async (formValues: FormValues, completeArray: string): Promise<HtmlBlock> => {
    // choose correct prompt template and take values from form and inject them into the template
    const CreateHead: PromptTemplate = "CreateHead";
    const CreateHeadPrompt = getPromptTemplate(CreateHead, formValues);
    // fetch for the head html block, joins CreateHeadPrompt with full htmlstring for gpt to analyze
    try {
      const data = CreateHeadPrompt+completeArray;
      console.log('testi',data);
      const headData = await postQuestion("html", data);
      const sanitizedHeadData = removeHtmlMarkdown(headData);
      // creates document start html block and injects sanitized head data into it and saves it to local storage
      const documentStart = `<!DOCTYPE html>
<html lang="en">
${sanitizedHeadData}
<body style="margin: auto;">
`;
      // returns sanitized head htmlstring
      return { id: "documentStart", content: documentStart };
    } catch (error) {
      console.log("error: ", error);
      return { id: "", content: "" };
    }
  };

  return {
    progressCount,
    errorCount,
    createHtmlBlock,
    createWebPage,
    createHeadInfo,
    removeHtmlMarkdown,
  };
};

export { PromptFunctions };
