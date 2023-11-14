import {FormValues, PromptTemplate, getPromptTemplate} from "./Prompts";
import {useChatGPT} from "../hooks/ApiHooks";

const PromptFunctions = () => {
  const {postQuestion} = useChatGPT();

const removeHtmlMarkdown = (inputString: string) => {
    return inputString.replace(/```html|```/g, '');
};

const getNavigation = async (formValues:FormValues) => {
    const createNavigation: PromptTemplate = 'createNavigation';
    const createNavigationPrompt = getPromptTemplate(createNavigation, formValues);
    try {
      const navigationData = await postQuestion("html_block", createNavigationPrompt);
			const sanitizedNavigationData = removeHtmlMarkdown(navigationData);
      localStorage.setItem('htmlNavigation', sanitizedNavigationData);
			return sanitizedNavigationData;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getWelcome = async (formValues:FormValues) => {
    const createWelcomeSection: PromptTemplate = 'createWelcomeSection';
    const createWelcomeSectionPrompt = getPromptTemplate(createWelcomeSection, formValues);
    try {
      const welcomeData = await postQuestion("html_block", createWelcomeSectionPrompt);
			const sanitizedWelcomeData = removeHtmlMarkdown(welcomeData);
      localStorage.setItem('htmlWelcome', sanitizedWelcomeData);
			return sanitizedWelcomeData;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getMainSection = async (formValues:FormValues) => {
    const createMainSection: PromptTemplate = 'createMainSection';
    const createMainSectionPrompt = getPromptTemplate(createMainSection, formValues);
    try {
      const mainData = await postQuestion("html_block", createMainSectionPrompt);
			const sanitizedMainData = removeHtmlMarkdown(mainData);
      localStorage.setItem('htmlMain', sanitizedMainData);
			return sanitizedMainData;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getTable = async (formValues:FormValues) => {
    const createTableSection: PromptTemplate = 'createTableSection';
    const createTableSectionPrompt = getPromptTemplate(createTableSection, formValues);
    try {
      const tableData = await postQuestion("html_block", createTableSectionPrompt);
			const sanitizedTableData = removeHtmlMarkdown(tableData);
      localStorage.setItem('htmlTable', sanitizedTableData);
			return sanitizedTableData;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getFooter = async (formValues:FormValues) => {
    const createFooter: PromptTemplate = 'createFooter';
    const createFooterPrompt = getPromptTemplate(createFooter, formValues);
    try {
      const footerData = await postQuestion("html_block", createFooterPrompt);
			const sanitizedFooterData = removeHtmlMarkdown(footerData);
      localStorage.setItem('htmlFooter', sanitizedFooterData);
			return sanitizedFooterData;
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

			const firstSlot = `<!DOCTYPE html>
			<html lang="en">
			${sanitizedHeadData}
			<body>
			`;
			localStorage.setItem('firstSlot', firstSlot);
			
			return sanitizedHeadData;
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return {getNavigation, getFooter, getHead, getTable, getWelcome, getMainSection};
}

  export {PromptFunctions}; 