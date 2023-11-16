import { useState } from "react";
import { PromptFunctions } from "../utils/PromptFunctions";
import { FormValues, PromptTemplate } from "../utils/Prompts";
import { useChat } from "../contexts/ChatContext";

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
  const { createHeadInfo, createHtmlBlock, createHTML } = PromptFunctions();
  const { dispatch } = useChat();

  // Destructuring formValues from originalFormValues
  const { formValues: initialValues } = originalFormValues;
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
    localStorage.setItem("completeArray", htmlArray.join(""));
    (await createHeadInfo(formStateValues, localStorage.getItem("completeArray") || "")) || "";
    createHTML();
  };

  const handleEditForm = async (htmlBlockName: PromptTemplate, event: React.FormEvent) => {
    event.preventDefault();
    (await createHtmlBlock(htmlBlockName, formStateValues)) || "";
    createHTML();
    dispatch({ type: "SET_QUESTION", payload: formStateValues.additionalInfo });
  };

  const [activeSection, setActiveSection] = useState<string | null>(null);
  // Toggle function to set the active section
  const toggleSection = (section: any) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

  const sections = [
    { value: "navigation", label: "Edit Navigation" },
    { value: "welcome", label: "Edit Welcome" },
    { value: "main", label: "Edit Main" },
    { value: "table", label: "Edit Table" },
    { value: "map", label: "Edit Map" },
    { value: "footer", label: "Edit Footer" },
  ];

  return (
    <div className='py-4 space-x-2 flex flex-col flex-wrap justify-center items-center'>
      <button onClick={editHead} className='bg-black text-white p-2 mb-4 rounded w-64  hover:bg-green-500'>
        Redo Head Tag Information
      </button>
      <div className='flex justify-center flex-wrap'>
        <button
          onClick={() => toggleSection("navigation")}
          className={`py-2 px-4 rounded m-1 hover:bg-green-500 ${
            activeSection === "navigation" ? "bg-green-500 text-white" : "bg-black text-white"
          }`}
        >
          {activeSection === "navigation" ? "Close Form" : "Edit Navigation"}
        </button>

        <button
          onClick={() => toggleSection("welcome")}
          className={`py-2 px-4 rounded m-1 hover:bg-green-500 ${
            activeSection === "welcome" ? "bg-green-500 text-white" : "bg-black text-white"
          }`}
        >
          {activeSection === "welcome" ? "Close Form" : "Edit Welcome"}
        </button>

        <button
          onClick={() => toggleSection("main")}
          className={`py-2 px-4 rounded m-1 hover:bg-green-500 ${
            activeSection === "main" ? "bg-green-500 text-white" : "bg-black text-white"
          }`}
        >
          {activeSection === "main" ? "Close Form" : "Edit Main"}
        </button>

        <button
          onClick={() => toggleSection("table")}
          className={`py-2 px-4 rounded m-1 hover:bg-green-500 ${
            activeSection === "table" ? "bg-green-500 text-white" : "bg-black text-white"
          }`}
        >
          {activeSection === "table" ? "Close Form" : "Edit Table"}
        </button>

        <button
          onClick={() => toggleSection("map")}
          className={`py-2 px-4 rounded m-1 hover:bg-green-500 ${
            activeSection === "map" ? "bg-green-500 text-white" : "bg-black text-white"
          }`}
        >
          {activeSection === "map" ? "Close Form" : "Edit Map"}
        </button>

        <button
          onClick={() => toggleSection("footer")}
          className={`py-2 px-4 rounded m-1 hover:bg-green-500 ${
            activeSection === "footer" ? "bg-green-500 text-white" : "bg-black text-white"
          }`}
        >
          {activeSection === "footer" ? "Close Form" : "Edit Footer"}
        </button>
      </div>

      <div className='flex justify-center flex-wrap'>
        <select
          value={activeSection || ""}
          onChange={(e) => toggleSection(e.target.value)}
          className='py-2 px-4 rounded m-1 bg-black text-white'
        >
          {sections.map((section) => (
            <option key={section.value} value={section.value}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      {activeSection === "navigation" && (
        <form
          className='bg-gray-200 m-2 p-4 rounded-b-md flex flex-col'
          onSubmit={(event) => handleEditForm("createNavigation", event)}
        >
          <textarea
            rows={3}
            cols={80}
            placeholder='Give additional information'
            value={formStateValues.additionalInfo}
            onChange={(event) =>
              setFormStateValues({
                ...formStateValues,
                additionalInfo: event.target.value,
              })
            }
            className='rounded-md border-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full'
          />
          <button type='submit' className='bg-black text-white py-2 rounded mt-2 hover:bg-green-500'>
            Redo Navigation
          </button>
        </form>
      )}

      {activeSection === "welcome" && (
        <form
          className='bg-gray-200 p-4 m-2 rounded-md flex flex-col'
          onSubmit={(event) => handleEditForm("createWelcomeSection", event)}
        >
          <textarea
            rows={3}
            cols={80}
            placeholder='Give additional information'
            value={formStateValues.additionalInfo}
            onChange={(event) =>
              setFormStateValues({
                ...formStateValues,
                additionalInfo: event.target.value,
              })
            }
            className='rounded-md border-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full'
          />
          <button type='submit' className='bg-black text-white py-2 rounded mt-2 hover:bg-green-500'>
            Redo Welcome
          </button>
        </form>
      )}

      {activeSection === "main" && (
        <form
          className='bg-gray-200 p-4 m-2 rounded-md flex flex-col'
          onSubmit={(event) => handleEditForm("createMainSection", event)}
        >
          <textarea
            rows={3}
            cols={80}
            placeholder='Give additional information'
            value={formStateValues.additionalInfo}
            onChange={(event) =>
              setFormStateValues({
                ...formStateValues,
                additionalInfo: event.target.value,
              })
            }
            className='rounded-md border-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full'
          />
          <button type='submit' className='bg-black text-white py-2 rounded mt-2 hover:bg-green-500'>
            Redo Main
          </button>
        </form>
      )}

      {activeSection === "map" && (
        <form
          className='bg-gray-200 p-4 m-2 rounded-md flex flex-col'
          onSubmit={(event) => handleEditForm("createMap", event)}
        >
          <textarea
            rows={3}
            cols={80}
            placeholder='Give additional information'
            value={formStateValues.additionalInfo}
            onChange={(event) =>
              setFormStateValues({
                ...formStateValues,
                additionalInfo: event.target.value,
              })
            }
            className='rounded-md border-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full'
          />
          <button type='submit' className='bg-black text-white py-2 rounded mt-2 hover:bg-green-500'>
            Redo Map
          </button>
        </form>
      )}

      {activeSection === "table" && (
        <form
          className='bg-gray-200 p-4 m-2 rounded-md flex flex-col'
          onSubmit={(event) => handleEditForm("createTableSection", event)}
        >
          <textarea
            rows={3}
            cols={80}
            placeholder='Give additional information'
            value={formStateValues.additionalInfo}
            onChange={(event) =>
              setFormStateValues({
                ...formStateValues,
                additionalInfo: event.target.value,
              })
            }
            className='rounded-md border-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full'
          />
          <button type='submit' className='bg-black text-white py-2 rounded mt-2 hover:bg-green-500'>
            Redo Table
          </button>
        </form>
      )}

      {activeSection === "footer" && (
        <form
          className='bg-gray-200 p-4 m-2 rounded-md flex flex-col'
          onSubmit={(event) => handleEditForm("createFooter", event)}
        >
          <textarea
            rows={3}
            cols={80}
            placeholder='Give additional information'
            value={formStateValues.additionalInfo}
            onChange={(event) =>
              setFormStateValues({
                ...formStateValues,
                additionalInfo: event.target.value,
              })
            }
            className='rounded-md border-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full'
          />
          <button type='submit' className='bg-black text-white py-2 rounded mt-2 hover:bg-green-500'>
            Redo Footer
          </button>
        </form>
      )}
    </div>
  );
};

export default EditForms;
