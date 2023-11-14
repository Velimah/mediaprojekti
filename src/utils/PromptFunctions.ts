import { FormValues, PromptTemplate, getPromptTemplate } from "./Prompts";
import { useChatGPT } from "../hooks/ApiHooks";

const getHtmlBlock = () => {
  const { postQuestion } = useChatGPT();

function removeHtmlMarkdown(inputString: string) {
    return inputString.replace(/```html|```/g, '');
}

const getNavigation = async (formValues:FormValues) => {
  console.log('formValues', formValues);
  console.log('postQuestion');
    const createNavigation: PromptTemplate = 'createNavigation';
    console.log('createNavigation', createNavigation);
    const createNavigationPrompt = getPromptTemplate(createNavigation, formValues);
    console.log('createNavigationPrompt', createNavigationPrompt);
    try {
      const data = await postQuestion("html_block", createNavigationPrompt);
			const newData = removeHtmlMarkdown(data);
			console.log('newData', newData);
      localStorage.setItem('htmlNavigation', newData);
			return newData;
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const getHero = async (formValues:FormValues) => {
    const createHeroSection: PromptTemplate = 'createHeroSection';
    const createHeroSectionPrompt = getPromptTemplate(createHeroSection, formValues);
    try {
      const data2 = await postQuestion("html_block", createHeroSectionPrompt);
			const newData2 = removeHtmlMarkdown(data2);
			console.log('newData2', newData2);
      localStorage.setItem('htmlHero', newData2);
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
			console.log('newData3', newData3);
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
			console.log('newData4', newData4);
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
			console.log('newData5', newData5);
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

			console.log('newHeadData', newHeadData);
			
			const firstSlot = `<!DOCTYPE html>
			<html lang="en">
			${newHeadData}
			<body>
			`;
      console.log('firstSlot', firstSlot);
			localStorage.setItem('firstSlot', firstSlot);
			
			return newHeadData;
    } catch (e) {
      console.log("error: ", e);
    }
  };
  return { getNavigation, getFooter, getHead, getTable, getHero, getMainSection };
}

  export { getHtmlBlock }; 