import { useContext } from "react";
import { FormValues, PromptTemplate, getPromptTemplate } from "./Prompts";
import { useChatGPT } from "../hooks/ApiHooks";
import { HtmlContext, HtmlBlock } from "../contexts/HtmlContext";

const PromptFunctions = () => {
  const { postQuestion } = useChatGPT();
  const { setHtmlArray } = useContext(HtmlContext);

  // revomes markdown from htmlstring
  const removeHtmlMarkdown = (inputString: string) => {
    const regex = /```html([\s\S]*?)```/g;
    const match = regex.exec(inputString);
    return match ? match[1] : inputString;
  };

  // creates web page template array with first and last html object. adds head info into head tags
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

  // sanitizes text using chatgpt
  const sanitizeText = async (promptTemplate: PromptTemplate, formValues: FormValues) => {
    const sanitizePrompt = getPromptTemplate(promptTemplate, formValues);
    try {
      const sanitizedText = await postQuestion("sanitize", sanitizePrompt);
      // returns sanitized text
      return sanitizedText;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // creates <head></head> html block with meta tags, ccslibrary and other basic info
  const createHeadInfo = async (formValues: FormValues, completeArray: string): Promise<HtmlBlock> => {
    // choose correct prompt template and take values from form and inject them into the template
    const CreateHeadPrompt = getPromptTemplate("CreateHead", formValues);
    //creates start of html document
    const documentStart = '<!DOCTYPE html>\n<html lang="en">\n<body style="margin: auto;">\n';
    try {
      const headData = await postQuestion("html", CreateHeadPrompt + completeArray);
      const sanitizedHeadData = removeHtmlMarkdown(headData);
      // creates updated document start and injects sanitized head data into it
      const documentStart = `<!DOCTYPE html>
<html lang="en">
${sanitizedHeadData}
<body style="margin: auto;">
`;
      // returns sanitized head html object
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
