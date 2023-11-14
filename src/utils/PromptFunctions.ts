import { FormValues, PromptTemplate, getPromptTemplate } from "./Prompts";
import { useChatGPT } from "../hooks/ApiHooks";

const getHtmlBlock = () => {
  const { postQuestion } = useChatGPT();

function removeHtmlMarkdown(inputString: string) {
    return inputString.replace(/```html|```/g, '');
}

const getNavigation = async (formValues:FormValues) => {
    const createNavigation: PromptTemplate = 'createNavigation';
    const createNavigationPrompt = getPromptTemplate(createNavigation, formValues);
    try {
      const data = await postQuestion("html_block", createNavigationPrompt);
			const newData = removeHtmlMarkdown(data);
      localStorage.setItem('htmlNavigation', newData);
			return newData;
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const getWelcome = async (formValues:FormValues) => {
    const createWelcomeSection: PromptTemplate = 'createWelcomeSection';
    const createWelcomeSectionPrompt = getPromptTemplate(createWelcomeSection, formValues);
    try {
      const data2 = await postQuestion("html_block", createWelcomeSectionPrompt);
			const newData2 = removeHtmlMarkdown(data2);
      localStorage.setItem('htmlWelcome', newData2);
			return newData2;
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const getMainSection = async (formValues:FormValues) => {
    const createMainSection: PromptTemplate = 'createMainSection';
    const createMainSectionPrompt = getPromptTemplate(createMainSection, formValues);
    try {
      const data3 = await postQuestion("html_block", createMainSectionPrompt);
			const newData3 = removeHtmlMarkdown(data3);
      localStorage.setItem('htmlMain', newData3);
			return newData3;
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const getTable = async (formValues:FormValues) => {
    const createTableSection: PromptTemplate = 'createTableSection';
    const createTableSectionPrompt = getPromptTemplate(createTableSection, formValues);
    try {
      const data4 = await postQuestion("html_block", createTableSectionPrompt);
			const newData4 = removeHtmlMarkdown(data4);
      localStorage.setItem('htmlTable', newData4);
			return newData4;
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const getFooter = async (formValues:FormValues) => {
    const createFooter: PromptTemplate = 'createFooter';
    const createFooterPrompt = getPromptTemplate(createFooter, formValues);
    try {
      const data5 = await postQuestion("html_block", createFooterPrompt);
			const newData5 = removeHtmlMarkdown(data5);
      localStorage.setItem('htmlFooter', newData5);
			return newData5;
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const getHead = async (formValues:FormValues, completeArray:string) => {
    const CreateHead: PromptTemplate = 'CreateHead';
    const CreateHeadPrompt = getPromptTemplate(CreateHead, formValues);
    try {
      const data6 = await postQuestion("create_head", CreateHeadPrompt+completeArray);
			const newHeadData = removeHtmlMarkdown(data6);

			const firstSlot = `<!DOCTYPE html>
			<html lang="en">
			${newHeadData}
			<body>
			`;
			localStorage.setItem('firstSlot', firstSlot);
			
			return newHeadData;
    } catch (e) {
      console.log("error: ", e);
    }
  };
  return { getNavigation, getFooter, getHead, getTable, getWelcome, getMainSection };
}

  export { getHtmlBlock }; 