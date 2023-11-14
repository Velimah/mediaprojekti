import {FormValues, PromptTemplate, getPromptTemplate} from "./Prompts";
import {useChatGPT} from "../hooks/ApiHooks";

const PromptFunctions = () => {
  const {postQuestion} = useChatGPT();

  const removeHtmlMarkdown = (inputString: string) => {
      return inputString.replace(/```html|```/g, '');
  };

  const createWebPage = async (formValues:FormValues) => {
    const htmlArray: string[] = [];

    const documentStart = '<!DOCTYPE html>\n<html lang="en">\n<body>\n'
    localStorage.setItem('documentStart', documentStart);

    const documentEnd = '\n</body>\n</html>';
    localStorage.setItem('documentEnd', documentEnd);
    try {
      const navigationData = await getHtmlBlock('createNavigation', formValues) || "";
      htmlArray.push(navigationData);
      const welcomeData = await getHtmlBlock('createWelcomeSection', formValues) || "";
      htmlArray.push(welcomeData);
      const mainData = await getHtmlBlock('createMainSection', formValues) || "";
      htmlArray.push(mainData);
      const tableData = await getHtmlBlock('createTableSection', formValues) || "";
      htmlArray.push(tableData);
      const footerData = await getHtmlBlock('createFooter', formValues) || "";
      htmlArray.push(footerData);
      const completeArray = htmlArray.join('');
      localStorage.setItem('completeArray', completeArray);
      await getHead(formValues, completeArray);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  //test for universal html block
  const getHtmlBlock = async (promptTemplate:PromptTemplate, formValues:FormValues) => {
    const createHtmlBlock = getPromptTemplate(promptTemplate, formValues);
    try {
      const htmlData = await postQuestion("html_block", createHtmlBlock);
      const sanitizedHtmlData = removeHtmlMarkdown(htmlData);
      localStorage.setItem(promptTemplate, sanitizedHtmlData);
      return sanitizedHtmlData;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getHead = async (formValues:FormValues, completeArray:string) => {
    const CreateHead: PromptTemplate = 'CreateHead';
    const CreateHeadPrompt = getPromptTemplate(CreateHead, formValues);
    try {
      const headData = await postQuestion("create_head", CreateHeadPrompt+completeArray);
      const sanitizedHeadData = removeHtmlMarkdown(headData);

      const documentStart = `<!DOCTYPE html>
  <html lang="en">
  ${sanitizedHeadData}
  <body>
  `;
      localStorage.setItem('documentStart', documentStart);
      
      return sanitizedHeadData;
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return {getHtmlBlock, createWebPage, getHead, removeHtmlMarkdown};
}

export {PromptFunctions}; 