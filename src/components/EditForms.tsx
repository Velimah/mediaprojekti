import { useState } from "react";
import { PromptFunctions } from "../utils/PromptFunctions";
import { FormValues } from "../utils/Prompts";

interface EditFormsProps {
  originalFormValues: {
    formValues: {
      topic: string;
      cssLibrary: string;
      colors: string;
      linkCount: string;
      linkNames: string;
      tableDetails: string;
      mapAddress: string;
      mapCity: string;
      additionalInfo: string;
    };
  };
}

const EditForms: React.FC<EditFormsProps> = ({ originalFormValues }) => {
	console.log('editforms', originalFormValues);
 // Destructuring formValues from originalFormValues
 const { formValues: initialValues } = originalFormValues;
 const { createHeadInfo, createHtmlBlock, createHTML } = PromptFunctions();

 const [formStateValues, setFormStateValues] = useState<FormValues>({
	 topic: initialValues.topic || "",
	 cssLibrary: initialValues.cssLibrary || "",
	 colors: initialValues.colors || "",
	 linkCount: initialValues.linkCount || "",
	 linkNames: initialValues.linkNames || "",
	 tableDetails: initialValues.tableDetails || "",
	 mapAddress: initialValues.mapAddress || "",
	 mapCity: initialValues.mapCity || "",
	 additionalInfo: initialValues.additionalInfo || "",
 });


      const editHead = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const htmlArray: string[] = [];
        htmlArray.push(localStorage.getItem("createWelcomeSection") || "");
        htmlArray.push(localStorage.getItem("createMainSection") || "");
        htmlArray.push(localStorage.getItem("createMap") || "");
        localStorage.setItem("completeArray", htmlArray.join(''));
        await createHeadInfo(formStateValues, localStorage.getItem('completeArray') || "") || "";
        createHTML();
      };
    
      const handleNavigationForm = async (event: React.FormEvent) => {
        event.preventDefault();
        await createHtmlBlock('createNavigation', formStateValues) || "";
        createHTML();
      };
    
      const handleWelcomeForm = async (event: React.FormEvent) => {
        event.preventDefault();
        await createHtmlBlock('createWelcomeSection', formStateValues) || "";
        createHTML();
      };
    
      const handleMainForm = async (event: React.FormEvent) => {
        event.preventDefault();
        await createHtmlBlock('createMainSection', formStateValues) || "";
        createHTML();
      };
    
        const handleTableForm = async (event: React.FormEvent) => {
        event.preventDefault();
        await createHtmlBlock('createTableSection', formStateValues) || "";
        createHTML();
      };
    
        const handleMapForm = async (event: React.FormEvent) => {
        event.preventDefault();
        await createHtmlBlock('createMap', formStateValues) || "";
        createHTML();
      };
    
        const handleFooterForm = async (event: React.FormEvent) => {
        event.preventDefault();
        await createHtmlBlock('createFooter', formStateValues) || "";
        createHTML();
      };

  // State and toggle function for Navigation section
	const [showNavigation, setShowNavigation] = useState(false);
	const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };
	// State and toggle function for Welcome section
	const [showWelcome, setShowWelcome] = useState(false);
  const toggleWelcome = () => {
    setShowWelcome(!showWelcome);
  };

  // State and toggle function for Main section
  const [showMain, setShowMain] = useState(false);
  const toggleMain = () => {
    setShowMain(!showMain);
  };

  // State and toggle function for Table section
  const [showTable, setShowTable] = useState(false);
  const toggleTable = () => {
    setShowTable(!showTable);
  };

  // State and toggle function for Map section
  const [showMap, setShowMap] = useState(false);
  const toggleMap = () => {
    setShowMap(!showMap);
  };

  // State and toggle function for Footer section
  const [showFooter, setShowFooter] = useState(false);
  const toggleFooter = () => {
    setShowFooter(!showFooter);
  };

    return (
			<div className="py-4 space-x-2 flex flex-wrap justify-center">
			<button
				onClick={editHead}
				className="bg-black text-white py-2 px-4 rounded m-1"
			>
				Redo Head Tag Information
			</button>
					 <button onClick={toggleNavigation} className={`py-2 px-4 rounded m-1 ${showNavigation ? 'bg-green-500 text-white' : 'bg-black text-white'}`}>
        				{showNavigation ? 'Close Form' : 'Edit Navigation'}
      				</button>
							
							<button onClick={toggleWelcome} className={`py-2 px-4 rounded m-1 ${showWelcome ? 'bg-green-500 text-white' : 'bg-black text-white'}`}>
        				{showWelcome ? 'Close Form' : 'Edit Welcome'}
      				</button>
								
							<button onClick={toggleMain} className={`py-2 px-4 rounded m-1 ${showMain ? 'bg-green-500 text-white' : 'bg-black text-white'}`}>
        				{showMain ? 'Close Form' : 'Edit Main'}
      				</button>
												
							<button onClick={toggleTable} className={`py-2 px-4 rounded m-1 ${showTable ? 'bg-green-500 text-white' : 'bg-black text-white'}`}>
        				{showTable ? 'Close Form' : 'Edit Table'}
      				</button>
											
							<button onClick={toggleMap} className={`py-2 px-4 rounded m-1 ${showMap ? 'bg-green-500 text-white' : 'bg-black text-white'}`}>
        				{showMap ? 'Close Form' : 'Edit Map'}
      				</button>

							<button onClick={toggleFooter} className={`py-2 px-4 rounded m-1 ${showFooter ? 'bg-green-500 text-white' : 'bg-black text-white'}`}>
        				{showFooter ? 'Close Form' : 'Edit Footer'}
      				</button>

							{showNavigation && (
							<form
              className="bg-gray-200 p-4 rounded-b-md"
              onSubmit={handleNavigationForm}
            	>
								<label className="relative"> Navigation
								<input
                  type="text"
                  placeholder="Give additional information"
                  value={formStateValues.additionalInfo}
									onChange={(event) => setFormStateValues({ ...formStateValues, additionalInfo: event.target.value })}
                  className="rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<button
									type="submit"
									className="bg-black text-white py-2 px-4 rounded m-1"
								>
								Redo Navigation
								</button>
							</form>
							)}

							{showWelcome && (
							<form
              className="bg-gray-200 p-4 rounded-b-md"
              onSubmit={handleWelcomeForm}
            	>
								<label className="relative"> Welcome
								<input
                  type="text"
                  placeholder="Give additional information"
                  value={formStateValues.additionalInfo}
									onChange={(event) => setFormStateValues({ ...formStateValues, additionalInfo: event.target.value })}
                  className="rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<button
									type="submit"
									className="bg-black text-white py-2 px-4 rounded m-1"
								>
								Redo Welcome
								</button>
							</form>
							)}

							{showMain && (
							<form
              className="bg-gray-200 p-4 rounded-b-md"
              onSubmit={handleMainForm}
            	>
								<label className="relative"> Main
								<input
                  type="text"
                  placeholder="Give additional information"
                  value={formStateValues.additionalInfo}
									onChange={(event) => setFormStateValues({ ...formStateValues, additionalInfo: event.target.value })}
                  className="rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<button
									type="submit"
									className="bg-black text-white py-2 px-4 rounded m-1"
								>
								Redo Main
								</button>
							</form>
							)}

							{showMap && (
							<form
              className="bg-gray-200 p-4 rounded-b-md"
              onSubmit={handleMapForm}
            	>
								<label className="relative"> Map
								<input
                  type="text"
                  placeholder="Give additional information"
                  value={formStateValues.additionalInfo}
									onChange={(event) => setFormStateValues({ ...formStateValues, additionalInfo: event.target.value })}
                  className="rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<button
									type="submit"
									className="bg-black text-white py-2 px-4 rounded m-1"
								>
								Redo Map
								</button>
							</form>
							)}

							{showTable && (
							<form
              className="bg-gray-200 p-4 rounded-b-md"
              onSubmit={handleTableForm}
            	>
								<label className="relative"> Table
								<input
                  type="text"
                  placeholder="Give additional information"
                  value={formStateValues.additionalInfo}
									onChange={(event) => setFormStateValues({ ...formStateValues, additionalInfo: event.target.value })}
                  className="rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<button
									type="submit"
									className="bg-black text-white py-2 px-4 rounded m-1"
								>
								Redo Table
								</button>
							</form>
							)}

							{showFooter && (
							<form
              className="bg-gray-200 p-4 rounded-b-md"
              onSubmit={handleFooterForm}
            	>
								<label className="relative"> Footer
								<input
                  type="text"
                  placeholder="Give additional information"
                  value={formStateValues.additionalInfo}
									onChange={(event) => setFormStateValues({ ...formStateValues, additionalInfo: event.target.value })}
                  className="rounded-md border-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full"
                />
								</label>
								<button
									type="submit"
									className="bg-black text-white py-2 px-4 rounded m-1"
								>
								Redo Footer
								</button>
							</form>
							)}
					 </div>
      );
    };
    
export default EditForms;