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

  const editHead = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
    console.log("undo1", pastHtmlArrays);
    if (pastHtmlArrays.length > 0) {
      const previousHtmlArray = pastHtmlArrays[pastHtmlArrays.length - 1];
      const previousHtmlArrays = [...pastHtmlArrays];
      setPastHtmlArrays(previousHtmlArrays.slice(0, -1));
      console.log("undo2", previousHtmlArray);
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
    <div className='py-4 space-x-2 flex flex-col flex-wrap justify-center items-center'>
      <div className='flex gap-2 m-2'>
        <button onClick={editHead} className='p-3 bg-black text-white rounded hover:bg-green-500 duration-150'>
          Generate Head Tag Information
        </button>
        <button onClick={undoLastChange} className='p-3 bg-black text-white rounded hover:bg-green-500 duration-150'>
          Undo Last Change
        </button>
      </div>

      <div className='flex flex-col flex-wrap justify-center items-center'>
        {/* ... (your other buttons) */}

        <div className='flex justify-center flex-wrap'>
          <form
            className='bg-gray-200 px-4 pt-2 pb-4 m-2 rounded-md flex flex-col'
            onSubmit={(event) => handleCreateHtmlBlockForm(selectedSection, event)}
          >
            {selectedSection === "createMap" && (
              <>
                <label className='relative'>
                  {" "}
                  Map Adress
                  <input
                    id='mapAdress'
                    type='text'
                    placeholder='Give me table section details ...'
                    value={formStateValues.mapAddress}
                    onChange={(event) =>
                      setFormStateValues({
                        ...formStateValues,
                        mapAddress: event.target.value,
                      })
                    }
                    className='rounded-md border-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full'
                  />
                </label>
                <label className='relative mt-2'>
                  {" "}
                  Map City
                  <input
                    id='mapCity'
                    type='text'
                    placeholder='Give me table section details ...'
                    value={formStateValues.mapCity}
                    onChange={(event) =>
                      setFormStateValues({
                        ...formStateValues,
                        mapCity: event.target.value,
                      })
                    }
                    className='rounded-md border-black p-3 placeholder-grey-400 placeholder:italic placeholder:truncate focus:outline-none focus:border-black focus:ring-black focus:ring-1 w-full'
                  />
                </label>
              </>
            )}
            <label className='relative mt-2'>
              {" "}
              Additional information
              <textarea
                rows={5}
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
            </label>
            <div className='flex gap-2 mt-2'>
              <select
                value={selectedSection}
                onChange={handleSelectChange}
                className='w-full bg-black text-white p-2 rounded hover:bg-green-500 duration-150'
              >
                {sections.map((section) => (
                  <option key={section.value} value={section.value}>
                    {section.label}
                  </option>
                ))}
              </select>
              <button type='submit' className='w-full bg-black text-white p-2 rounded hover:bg-green-500 duration-150'>
                Add New {getSectionDetails(selectedSection)}
              </button>
              {lastHtmlBlockId && (
                <button
                  onClick={reRollHtmlBlock}
                  className='w-full bg-black text-white p-2 rounded hover:bg-green-500 duration-150'
                >
                  Refetch {getSectionDetails(selectedSection)}
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
