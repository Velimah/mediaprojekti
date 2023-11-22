import { useState, useContext } from "react";
import { PromptFunctions } from "../utils/PromptFunctions";
import { FormValues, PromptTemplate } from "../utils/Prompts";
import { useChat } from "../contexts/ChatContext";
import { MediaContext } from "../contexts/MediaContext";
import { HtmlBlock } from "../contexts/MediaContext";
interface EditFormsProps {
  originalFormValues: {
    formValues: {
      cssLibrary: string;
      colors: string;
      mapAddress: string;
      mapCity: string;
      additionalInfo: string;
    };
  };
  lastHtmlBlockIndex: number;
  setLastHtmlBlockIndex: (params: number) => void;
  setSelectedSection: (params: PromptTemplate) => void;
  selectedSection: PromptTemplate;
  getSectionDetails: (params: PromptTemplate) => string;
  pastHtmlArrays: HtmlBlock[][];
  setPastHtmlArrays: (params: HtmlBlock[][]) => void;
}

const EditForms: React.FC<EditFormsProps> = ({
  originalFormValues,
  lastHtmlBlockIndex,
  setLastHtmlBlockIndex,
  setSelectedSection,
  selectedSection,
  getSectionDetails,
  pastHtmlArrays,
  setPastHtmlArrays,
}) => {
  const { createHeadInfo, createHtmlBlock } = PromptFunctions();
  const { dispatch } = useChat();
  const [fetching, setFetching] = useState<boolean>(false);
  const { htmlArray, setHtmlArray } = useContext(MediaContext);

  // Destructuring formValues from originalFormValues
  const { formValues: initialValues } = originalFormValues;
  const [formStateValues, setFormStateValues] = useState<FormValues>({
    cssLibrary: initialValues?.cssLibrary || "",
    colors: initialValues?.colors || "",
    mapAddress: initialValues?.mapAddress || "",
    mapCity: initialValues?.mapCity || "",
    additionalInfo: initialValues?.additionalInfo || "",
  });

  const editHead = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newArray = [...htmlArray];
    setFetching(true);

    const sanitizedHtmlData =
      (await createHeadInfo(formStateValues, htmlArray.map((block) => block.content).join(""))) || "";
    newArray[0] = sanitizedHtmlData;
    setPastHtmlArrays([...pastHtmlArrays, htmlArray]);
    setHtmlArray(newArray);
    setFetching(false);
  };

  const handleCreateHtmlBlockForm = async (htmlBlockName: PromptTemplate, event: React.FormEvent) => {
    event.preventDefault();
    const newArray = [...htmlArray];

    setFetching(true);
    const sanitizedHtmlData = (await createHtmlBlock(htmlBlockName, formStateValues)) || "";
    const insertIndex = newArray.length - 1;
    newArray.splice(insertIndex, 0, { id: insertIndex, name: htmlBlockName, content: sanitizedHtmlData });
    setLastHtmlBlockIndex(insertIndex);
    setPastHtmlArrays([...pastHtmlArrays, htmlArray]);
    setHtmlArray(newArray);
    //dispatch({ type: "SET_QUESTION", payload: formStateValues.additionalInfo });
    setFetching(false);
  };

  const reRollHtmlBlock = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newArray = [...htmlArray];
    const htmlBlockName: PromptTemplate = newArray[lastHtmlBlockIndex].name as PromptTemplate;

    setFetching(true);
    const sanitizedHtmlData = (await createHtmlBlock(htmlBlockName, formStateValues)) || "";
    newArray[lastHtmlBlockIndex].content = sanitizedHtmlData;
    setPastHtmlArrays([...pastHtmlArrays, htmlArray]);
    setHtmlArray(newArray);
    setFetching(false);
  };

  const undoLastChange = () => {
    if (pastHtmlArrays.length > 0) {
      console.log("pastHtmlArrays", pastHtmlArrays);
      const lastHtmlArray = pastHtmlArrays[pastHtmlArrays.length - 1];
      setHtmlArray(lastHtmlArray);
      setPastHtmlArrays(pastHtmlArrays.slice(0, -1)); // Remove the last state
    }
  };

  // select options for forms
  const sections = [
    { value: "createNavigation", label: "Navigation" },
    { value: "createWelcomeSection", label: "Text | Image" },
    { value: "createMainSection", label: "Text" },
    { value: "createTableSection", label: "Table" },
    { value: "createMap", label: "Text | Map" },
    { value: "createFooter", label: "Footer" },
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("event.target.value", event.target.value);
    setSelectedSection(event.target.value as PromptTemplate);
    setLastHtmlBlockIndex(99999);
  };

  return (
    <div className='py-4 space-x-2 flex flex-col flex-wrap justify-center items-center'>
      <div className='flex gap-2 m-2'>
        <button onClick={editHead} className='p-3 bg-black text-white rounded hover:bg-green-500'>
          Generate Head Tag Information
        </button>
        <button onClick={undoLastChange} className='p-3 bg-black text-white rounded hover:bg-green-500'>
          Undo Fetch
        </button>
      </div>

      <div className='flex flex-col flex-wrap justify-center items-center'>
        {/* ... (your other buttons) */}

        <div className='flex justify-center flex-wrap'>
          <form
            className='bg-gray-200 p-4 m-2 rounded-md flex flex-col'
            onSubmit={(event) => handleCreateHtmlBlockForm(selectedSection, event)}
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
            <div className='flex gap-2 mt-2'>
              <select
                value={selectedSection}
                onChange={handleSelectChange}
                className='w-full bg-black text-white p-2 rounded hover:bg-green-500'
              >
                {sections.map((section) => (
                  <option key={section.value} value={section.value}>
                    {section.label}
                  </option>
                ))}
              </select>
              <button type='submit' className='w-full bg-black text-white p-2 rounded hover:bg-green-500'>
                Add New {getSectionDetails(selectedSection)}
              </button>
              {lastHtmlBlockIndex !== 99999 && (
                <button onClick={reRollHtmlBlock} className='w-full bg-black text-white p-2 rounded hover:bg-green-500'>
                  Refetch {getSectionDetails(selectedSection)}
                </button>
              )}
              {fetching && (
                <div className='flex items-center gap-2 mt-2'>
                  <span className='relative flex h-3 w-3'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                    <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                  </span>
                  <p className='font-bold'>Building...</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForms;
