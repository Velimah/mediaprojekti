import { FormValues, PromptTemplate, getPromptTemplate } from "./Prompts";
import { useChatGPT } from "../hooks/ApiHooks";
import { useState } from "react";

const PromptFunctions = () => {
  const { postQuestion } = useChatGPT();
  const [progressCount, setProgressCount] = useState<string>("0 / 7");
  const [errorCount, setErrorCount] = useState<number>(0);

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
    const htmlArray: string[] = [];

    // html block that contains the start of the document
    const documentStart = '<!DOCTYPE html>\n<html lang="en">\n<body>\n';
    localStorage.setItem("documentStart", documentStart);

    // html block that contains the end of the document
    const documentEnd = "\n</body>\n</html>";
    localStorage.setItem("documentEnd", documentEnd);

    //fetch all html blocks and save them to htmlArray array
    try {
      const navigationData = (await createHtmlBlock("createNavigation", formValues)) || "";
      htmlArray.push(navigationData);
      if (navigationData === "") {
        setErrorCount((prevError) => prevError + 1);
      }
      setProgressCount("1 / 7");
      sleep(1000);
      const welcomeData = (await createHtmlBlock("createWelcomeSection", formValues)) || "";
      htmlArray.push(welcomeData);
      if (welcomeData === "") {
        setErrorCount((prevError) => prevError + 1);
      }
      setProgressCount("2 / 7");
      sleep(1000);
      const mainData = (await createHtmlBlock("createMainSection", formValues)) || "";
      htmlArray.push(mainData);
      if (mainData === "") {
        setErrorCount((prevError) => prevError + 1);
      }
      setProgressCount("3 / 7");
      sleep(1000);
      const tableData = (await createHtmlBlock("createTableSection", formValues)) || "";
      htmlArray.push(tableData);
      if (tableData === "") {
        setErrorCount((prevError) => prevError + 1);
      }
      setProgressCount("4 / 7");
      sleep(1000);
      const mapData = (await createHtmlBlock("createMap", formValues)) || "";
      htmlArray.push(mapData);
      if (mapData === "") {
        setErrorCount((prevError) => prevError + 1);
      }
      setProgressCount("5 / 7");
      sleep(1000);
      const footerData = (await createHtmlBlock("createFooter", formValues)) || "";
      htmlArray.push(footerData);
      if (footerData === "") {
        setErrorCount((prevError) => prevError + 1);
      }
      setProgressCount("6 / 7");
      sleep(1000);

      // join all html blocks in htmlArray together
      const completeArray = htmlArray.join("");
      // save comeplete html to local storage
      localStorage.setItem("completeArray", completeArray);
      // create head info html block and save it to local storage
      await createHeadInfo(formValues, completeArray);
      setProgressCount("0 / 7");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // function to create full html file from html blocks saved in localstorage
  const createHTML = () => {
    const htmlArray: string[] = [];
    htmlArray.push(localStorage.getItem("documentStart") || "");
    htmlArray.push(localStorage.getItem("createNavigation") || "");
    htmlArray.push(localStorage.getItem("createWelcomeSection") || "");
    htmlArray.push(localStorage.getItem("createMainSection") || "");
    htmlArray.push(localStorage.getItem("createTableSection") || "");
    htmlArray.push(localStorage.getItem("createMap") || "");
    htmlArray.push(localStorage.getItem("createFooter") || "");
    htmlArray.push(localStorage.getItem("documentEnd") || "");
    // join all html blocks in htmlArray together
    const completeArray = htmlArray.join("");
    localStorage.setItem("completeArray", completeArray);
    return completeArray;
  };

  // function to create html block
  const createHtmlBlock = async (promptTemplate: PromptTemplate, formValues: FormValues) => {
    // gets the correct template for prompt and injects values from form into the template
    const createHtmlBlock = getPromptTemplate(promptTemplate, formValues);
    // fetch for the html block
    try {
      const htmlData = await postQuestion("html_block", createHtmlBlock);
      // removes markdown from htmlstring
      const sanitizedHtmlData = removeHtmlMarkdown(htmlData);
      // saves sanitized htmlstring into localstorage named after prompt name
      if (sanitizedHtmlData !== "") {
        localStorage.setItem(promptTemplate, sanitizedHtmlData);
      }
      // returns sanitized htmlstring
      return sanitizedHtmlData;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // creates <head></head> info html block and saves it to local storage
  const createHeadInfo = async (formValues: FormValues, completeArray: string) => {
    // choose correct prompt template and take values from form and inject them into the template
    const CreateHead: PromptTemplate = "CreateHead";
    const CreateHeadPrompt = getPromptTemplate(CreateHead, formValues);
    // fetch for the head html block, joins CreateHeadPrompt with full htmlstring for gpt to analyze
    try {
      const headData = await postQuestion("create_head", CreateHeadPrompt + completeArray);
      const sanitizedHeadData = removeHtmlMarkdown(headData);
      // creates document start html block and injects sanitized head data into it and saves it to local storage
      const documentStart = `<!DOCTYPE html>
<html lang="en">
${sanitizedHeadData}
<body>
`;
      localStorage.setItem("documentStart", documentStart);
      // returns sanitized head htmlstring
      return sanitizedHeadData;
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return {
    progressCount,
    errorCount,
    createHtmlBlock,
    createHTML,
    createWebPage,
    createHeadInfo,
    removeHtmlMarkdown,
  };
};

export { PromptFunctions };
