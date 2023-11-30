import { useContext } from "react";
import { FormValues, PromptTemplate, getPromptTemplate } from "./Prompts";
import { useChatGPT } from "../hooks/ApiHooks";
import { HtmlContext, HtmlBlock } from "../contexts/HtmlContext";

const PromptFunctions = () => {
  const { postQuestion } = useChatGPT();
  const { setHtmlArray } = useContext(HtmlContext);

  const removeHtmlMarkdown = (inputString: string) => {
    const regex = /```html([\s\S]*?)```/g;
    const match = regex.exec(inputString);
    return match ? match[1] : inputString;
  };

  const createWebPageTemplate = async (formValues: FormValues) => {
    setHtmlArray([]);
    const documentStart = '<!DOCTYPE html>\n<html lang="en">\n<body style="margin: auto;">\n';
    const documentEnd = "\n</body>\n</html>";

    const newArray: HtmlBlock[] = [
      { id: 0, name: "documentStart", content: documentStart },
      { id: 1000, name: "documentEnd", content: documentEnd },
    ];
    try {
      const newHead = await createHeadInfo(formValues, "");
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
    } catch (error) {
      console.log("error: ", error);
    }
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

      // returns sanitized htmlstring
      return sanitizedHtmlData;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const sanitizeText = async (promptTemplate: PromptTemplate, formValues: FormValues) => {
    const sanitizePrompt = getPromptTemplate(promptTemplate, formValues);
    try {
      const sanitizedText = await postQuestion("sanitize", sanitizePrompt);
      return sanitizedText;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // creates <head></head> info html block and saves it to local storage
  const createHeadInfo = async (formValues: FormValues, completeArray: string): Promise<HtmlBlock> => {
    // choose correct prompt template and take values from form and inject them into the template
    const CreateHeadPrompt = getPromptTemplate("CreateHead", formValues);
    // fetch for the head html block, joins CreateHeadPrompt with full htmlstring for gpt to analyze

    const documentStart = '<!DOCTYPE html>\n<html lang="en">\n<body style="margin: auto;">\n';
    try {
      const headData = await postQuestion("html", CreateHeadPrompt + completeArray);
      const sanitizedHeadData = removeHtmlMarkdown(headData);
      // creates document start html block and injects sanitized head data into it and saves it to local storage
      const documentStart = `<!DOCTYPE html>
<html lang="en">
${sanitizedHeadData}
<body style="margin: auto;">
`;
      // returns sanitized head htmlstring
      return { id: 0, name: "documentStart", content: documentStart };
    } catch (error) {
      console.log("error: ", error);
      return { id: 0, name: "documentStart", content: documentStart };
    }
  };

  return {
    createHtmlBlock,
    createHeadInfo,
    removeHtmlMarkdown,
    createWebPageTemplate,
    sanitizeText,
  };
};

export { PromptFunctions };
