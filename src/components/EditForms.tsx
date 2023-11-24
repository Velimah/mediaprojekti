import { useState, useContext } from "react";
import { PromptFunctions } from "../utils/PromptFunctions";
import { FormValues, PromptTemplate } from "../utils/Prompts";
import { useChat } from "../contexts/ChatContext";
import { HtmlContext } from "../contexts/HtmlContext";
import { useChatGPT } from "../hooks/ApiHooks";
import Loader from "./Loader";
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
  setSelectedSection: (params: PromptTemplate) => void;
  selectedSection: PromptTemplate;
  getSectionDetails: (params: PromptTemplate) => string;
}

const EditForms: React.FC<EditFormsProps> = ({
  originalFormValues,
  setSelectedSection,
  selectedSection,
  getSectionDetails,
}) => {
  const { createHeadInfo, createHtmlBlock } = PromptFunctions();
  const { dispatch } = useChat();
  const { loading, setLoading } = useChatGPT();
  const { htmlArray, setHtmlArray, pastHtmlArrays, setPastHtmlArrays, lastHtmlBlockId, setLastHtmlBlockId } =
    useContext(HtmlContext);

  // Destructuring formValues from originalFormValues
  const { formValues: initialValues } = originalFormValues;
  const [formStateValues, setFormStateValues] = useState<FormValues>({
    cssLibrary: initialValues?.cssLibrary || "",
    colors: initialValues?.colors || "",
    mapAddress: initialValues?.mapAddress || "",
    mapCity: initialValues?.mapCity || "",
    additionalInfo: initialValues?.additionalInfo || "",
  });

  const redoHeadTag = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newArray = [...htmlArray];
    setLoading(true);

    const sanitizedHtmlData = await createHeadInfo(
      formStateValues,
      htmlArray
        .slice(1)
        .map((block) => block.content)
        .join("")
    );
    newArray[0] = sanitizedHtmlData;
    newArray[htmlArray.length - 1] = { id: 1000, name: "documentEnd", content: "\n</body>\n</html>" };
    setPastHtmlArrays([...pastHtmlArrays, htmlArray]);
    setHtmlArray(newArray);
    setLoading(false);
  };

  const checkForFreeId = (newArray: { id: number }[]) => {
    for (let i = 1; i < 1000; i++) {
      const isDuplicateId = newArray.some((element: { id: number }) => element.id === i);
      if (!isDuplicateId) {
        if (typeof i === "number") return i; // Return the first available ID
      }
    }
  };

  const handleCreateHtmlBlockForm = async (htmlBlockName: PromptTemplate, event: React.FormEvent) => {
    event.preventDefault();
    const newHtmlArray = [...htmlArray];
    setPastHtmlArrays([...pastHtmlArrays, htmlArray]); // Save the current state to the history
    setLoading(true);
    try {
      const sanitizedHtmlData = await createHtmlBlock(htmlBlockName, formStateValues);
      if (typeof sanitizedHtmlData === "string") {
        const newId = checkForFreeId(newHtmlArray);
        if (typeof newId === "number") {
          newHtmlArray.splice(newHtmlArray.length - 1, 0, {
            id: newId,
            name: htmlBlockName,
            content: sanitizedHtmlData,
          });
          setLastHtmlBlockId(newId);
          setHtmlArray(newHtmlArray);
        }
      }
      dispatch({ type: "SET_QUESTION", payload: formStateValues.additionalInfo });
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const reRollHtmlBlock = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newHtmlArray = [...htmlArray];
    setPastHtmlArrays([...pastHtmlArrays, htmlArray]); // Save the current state to the history
    if (typeof lastHtmlBlockId === "number") {
      const index = newHtmlArray.findIndex((item) => item.id === lastHtmlBlockId);
      const htmlBlockName: PromptTemplate = newHtmlArray[index].name as PromptTemplate;
      setLoading(true);
      try {
        const sanitizedHtmlData = await createHtmlBlock(htmlBlockName, formStateValues);
        if (typeof sanitizedHtmlData === "string") {
          newHtmlArray[index].content = sanitizedHtmlData;
          setHtmlArray(newHtmlArray);
        }
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    }
  };

  const undoLastChange = () => {
    if (pastHtmlArrays.length > 0) {
      const previousHtmlArray = pastHtmlArrays[pastHtmlArrays.length - 1];
      const previousHtmlArrays = [...pastHtmlArrays];
      setPastHtmlArrays(previousHtmlArrays.slice(0, -1));
      setHtmlArray(previousHtmlArray);
      setLastHtmlBlockId(null);
    }
    // Remove this line -> setUndo(false);
  };

  // select options for form
  const sections = [
    { value: "createNavigation", label: "Navigation" },
    { value: "createWelcomeSection", label: "Text | Image" },
    { value: "createMainSection", label: "Text" },
    { value: "createTableSection", label: "Table" },
    { value: "createMap", label: "Text | Map" },
    { value: "createFooter", label: "Footer" },
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedSection(event.target.value as PromptTemplate);
    setLastHtmlBlockId(null);
  };

  return (
    <div className='flex flex-col items-center justify-center font-robot'>
      <div className='flex items-center justify-center gap-5'>
        <button onClick={redoHeadTag} className='build-btn toolbar-btn w-40'>
          <span className='flex justify-center gap-2'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
              <path d='M1,12A11,11,0,0,1,17.882,2.7l1.411-1.41A1,1,0,0,1,21,2V6a1,1,0,0,1-1,1H16a1,1,0,0,1-.707-1.707l1.128-1.128A8.994,8.994,0,0,0,3,12a1,1,0,0,1-2,0Zm21-1a1,1,0,0,0-1,1,9.01,9.01,0,0,1-9,9,8.9,8.9,0,0,1-4.42-1.166l1.127-1.127A1,1,0,0,0,8,17H4a1,1,0,0,0-1,1v4a1,1,0,0,0,.617.924A.987.987,0,0,0,4,23a1,1,0,0,0,.707-.293L6.118,21.3A10.891,10.891,0,0,0,12,23,11.013,11.013,0,0,0,23,12,1,1,0,0,0,22,11Z' />
            </svg>
            REDO HEAD
          </span>
        </button>
        <button onClick={undoLastChange} className='toolbar-btn w-40 md:w-auto'>
          <span className='flex justify-center gap-2'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
              <path
                fillRule='evenodd'
                d='M15 3.75A5.25 5.25 0 009.75 9v10.19l4.72-4.72a.75.75 0 111.06 1.06l-6 6a.75.75 0 01-1.06 0l-6-6a.75.75 0 111.06-1.06l4.72 4.72V9a6.75 6.75 0 0113.5 0v3a.75.75 0 01-1.5 0V9c0-2.9-2.35-5.25-5.25-5.25z'
                clipRule='evenodd'
              />
            </svg>
            UNDO
          </span>
        </button>
      </div>

      <div className='flex flex-col flex-wrap justify-center items-center'>
        {/* ... (your other buttons) */}

        <div className='bg-ai-black-100 p-4 rounded-b-md relative'>
          <form className=' text-white' onSubmit={(event) => handleCreateHtmlBlockForm(selectedSection, event)}>
            {selectedSection === "createMap" && (
              <>
                <label className='relative'>
                  <input
                    id='mapAdress'
                    type='text'
                    placeholder='Give an adress ...'
                    value={formStateValues.mapAddress}
                    onChange={(event) =>
                      setFormStateValues({
                        ...formStateValues,
                        mapAddress: event.target.value,
                      })
                    }
                    className='mb-2 rounded-md border-ai-black text-ai-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-ai-primary focus:ring-ai-primary focus:ring-2 w-full'
                  />
                  <span className='absolute left-0 top-0 px-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='nonabsolutee'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                      />
                    </svg>
                  </span>
                </label>
                <label className='relative'>
                  <input
                    id='mapAdress'
                    type='text'
                    placeholder='And the city  ...'
                    value={formStateValues.mapAddress}
                    onChange={(event) =>
                      setFormStateValues({
                        ...formStateValues,
                        mapAddress: event.target.value,
                      })
                    }
                    className='mb-2 rounded-md border-ai-black text-ai-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-ai-primary focus:ring-ai-primary focus:ring-2 w-full'
                  />
                  <span className='absolute left-0 top-0 px-3'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='nonabsolutee'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                      />
                    </svg>
                  </span>
                </label>
              </>
            )}
            <label className='relative mt-2'>
              <textarea
                rows={5}
                cols={80}
                placeholder='Give me additional information ...'
                value={formStateValues.additionalInfo}
                onChange={(event) =>
                  setFormStateValues({
                    ...formStateValues,
                    additionalInfo: event.target.value,
                  })
                }
                className='rounded-md border-ai-black text-ai-black py-3 pl-12 pr-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-ai-primary focus:ring-ai-primary focus:ring-2 w-full'
              />
            </label>
            <div className='flex gap-2 mt-2 '>
              <select value={selectedSection} onChange={handleSelectChange} className='toolbar-btn bg-ai-black'>
                {sections.map((section) => (
                  <option className='bg-ai-primary' key={section.value} value={section.value}>
                    {section.label}
                  </option>
                ))}
              </select>
              <button type='submit' className='primary-btn'>
                <span className='flex justify-center gap-2'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
                    <path d='M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Zm5-9a1,1,0,0,1-1,1H13v3a1,1,0,0,1-2,0V13H8a1,1,0,0,1,0-2h3V8a1,1,0,0,1,2,0v3h3A1,1,0,0,1,17,12Z' />
                  </svg>
                  NEW {getSectionDetails(selectedSection).toUpperCase()}
                </span>
              </button>
              {lastHtmlBlockId && (
                <button onClick={reRollHtmlBlock} className='primary-btn'>
                  <span className='flex justify-center gap-2'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
                      <path d='M1,12A11,11,0,0,1,17.882,2.7l1.411-1.41A1,1,0,0,1,21,2V6a1,1,0,0,1-1,1H16a1,1,0,0,1-.707-1.707l1.128-1.128A8.994,8.994,0,0,0,3,12a1,1,0,0,1-2,0Zm21-1a1,1,0,0,0-1,1,9.01,9.01,0,0,1-9,9,8.9,8.9,0,0,1-4.42-1.166l1.127-1.127A1,1,0,0,0,8,17H4a1,1,0,0,0-1,1v4a1,1,0,0,0,.617.924A.987.987,0,0,0,4,23a1,1,0,0,0,.707-.293L6.118,21.3A10.891,10.891,0,0,0,12,23,11.013,11.013,0,0,0,23,12,1,1,0,0,0,22,11Z' />
                    </svg>
                    REDO {getSectionDetails(selectedSection).toUpperCase()}
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default EditForms;
