import { useState, useRef, useEffect } from "react";
import { useChat } from "../contexts/ChatContext";
import { PromptFunctions } from "../utils/PromptFunctions";
import { useLocation } from 'react-router-dom';
import EditForms from "../components/EditForms";

const AdvancedResult = () => {
  const { state } = useChat();
  const { question, answer /*, editedanswer*/ } = state;

  const [code, setCode] = useState<string>("");
  const previewFrame = useRef<HTMLIFrameElement>(null);
  const codeTextarea = useRef<HTMLTextAreaElement>(null);

  const [codeVisible, setCodeVisible] = useState<boolean>(true);
  const [previewVisible, setPreviewVisible] = useState<boolean>(true);

  const {createHTML} = PromptFunctions();
  const location = useLocation();

	const originalFormValues = location.state || {};


  useEffect(() => {
    // Update the code state with the current answer
    if (answer) {
			setCode(createHTML());
    }
  }, [answer]);

  // useEffect backup didnt work in server?
	useEffect(() => {
    if (answer) {
			setCode(createHTML());
    } 
  }, []);


  const handleRunCode = () => {
    if (previewFrame.current) {
      const iframeDocument = previewFrame.current.contentDocument;
      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(code);
        iframeDocument.close();
      }
    }
  };

  const handleUndo = () => {
    // Undo logic here
  };

  const handleCopy = async () => {
    // TODO? show notification that says text was copied to clipboard
    try {
      if (codeTextarea.current) {
        await navigator.clipboard.writeText(codeTextarea.current.value);
        console.log("Copied");
      }
    } catch (error) {
      console.log("Error when copying to clipboard: ", error);
    }
  };

  const handleBuild = () => {
    // Build logic here
  };

  const handleSave = () => {
    // Save logic here
  };

  handleRunCode();

  const handleSaveToFile = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const fileLink = document.createElement("a");
    fileLink.href = url;
    fileLink.download = "your-website.html";
    fileLink.dispatchEvent(new MouseEvent("click"));
    URL.revokeObjectURL(url);
  };

  /* toggle code frame's visibiltiy */
  const toggleCodeVisibility = () => {
    setCodeVisible(!codeVisible);
  };
  /* toggle preview frame's visibiltiy */
  const togglePreviewVisibility = () => {
    setPreviewVisible(!previewVisible);
  };

  return (
    <>
      <div className="w-3/4 px-4">
        <div className="mb-8">
          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-md shadow-lg w-full md:w-1/2">
            <div className="flex flex-row bg-gray-200 w-full p-3 h-12 items-center justify-center rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 10"
                strokeWidth="1.5"
                stroke="black"
                className="h-12 shrink-0"
              >
                <rect
                  x="5"
                  y="2"
                  width="14"
                  height="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="black"
                />
                <circle
                  cx="8.5"
                  cy="6.5"
                  r="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="white"
                  className="animate-pulse"
                />
                <circle
                  cx="15.5"
                  cy="6.5"
                  r="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="white"
                  className="animate-pulse"
                />
              </svg>
              <span className="pr-4 font-bold">:</span>
              <h2 className="text-lg font-bold uppercase">Your instructions</h2>
            </div>
            <div className="flex items-center rounded-md px-4">
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="nonabsolutee"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
              </svg> 
              <span className="p-4">{question}</span>
            </div>
          </div>
        </div>     
        <div className="mb-4">
          <div className="bg-white flex flex-col items-center border border-black rounded cursor-pointer">
            <h2 className="bg-black text-white text-lg font-bold w-full p-3 h-12 flex items-center uppercase" onClick={toggleCodeVisibility}>
              {codeVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 pr-1">
                  <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                </svg>              
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 pr-1">
                  <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              )}
              Code
              </h2>
              {codeVisible && (
                <div className="w-full pt-4 px-4">
                  <textarea
                    ref={codeTextarea}
                    id="code"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                    rows={15}
                    cols={50}
                    className="border pt-2 w-full bg-slate-100 border-gray-300 rounded-lg overflow-y-scroll resize-none"
                  ></textarea>
                </div>
              ) }
            <div className="py-4 space-x-2 flex flex-wrap justify-center">
              <button
                onClick={handleUndo}
                className="bg-black text-white py-2 px-4 rounded m-1"
              >
                Undo
              </button>
              <button
                onClick={handleCopy}
                className="bg-black text-white py-2 px-4 rounded m-1"
              >
                Copy
              </button>
              <button
                onClick={handleBuild}
                className="bg-black text-white py-2 px-4 rounded m-1"
              >
                Build
              </button>
              <button
                onClick={handleSave}
                className="bg-black text-white py-2 px-4 rounded m-1"
              >
                Save
              </button>
              <button
                onClick={handleSaveToFile}
                className="bg-black text-white py-2 px-4 rounded m-1"
              >
                Save as HTML
              </button>
            </div>
						<EditForms originalFormValues={originalFormValues} />
          </div>
        </div>
        {/*
        <div className="mb-4">
          <button
            onClick={handleRunCode}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Show preview
          </button>
        </div>*/}
        <div className="mb-4">
          <div className="bg-white flex flex-col items-center border border-black rounded cursor-pointer">
            <h2 className="bg-black text-white text-lg font-bold w-full p-3 h-12 flex items-center uppercase" onClick={togglePreviewVisibility}>
            {previewVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 pr-1">
                  <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                </svg>              
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 pr-1">
                  <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              )}
              Preview
            </h2>
              <iframe
              ref={previewFrame}
              title="Code preview"
              sandbox="allow-same-origin"
              width="100%"
              height={500}
              className={previewVisible ? ('border-black bg-slate-100 resize-x') : ('hidden')} />
          </div>
          </div>
      </div>
    </>
  );
};

export default AdvancedResult;