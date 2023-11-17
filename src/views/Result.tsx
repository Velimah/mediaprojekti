import { useState, useRef, useEffect } from "react";
import { useChat } from "../contexts/ChatContext";
import PromptDialog from "../components/PromptDialog";

const Result = () => {
  const { state } = useChat();
  const { question, answer /*, editedanswer*/ } = state;
  console.log("Question: ", question);

  const [code, setCode] = useState<string>("");
  const previewFrame = useRef<HTMLIFrameElement>(null);
  const codeTextarea = useRef<HTMLTextAreaElement>(null);

  const [codeVisible, setCodeVisible] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(true);

  const [hasSaved, setHasSaved] = useState<boolean>(false);

  /* add a warning when user is about to exit/refresh page IF not saved before new changes */
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.returnValue = 'Are you sure you want to leave? Your build may not be saved - please remember to save before leaving!';
    };
    !hasSaved && window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasSaved]);

  useEffect(() => {
    // Update the code state with the current answer
    if (answer) {
      setCode(answer);
    }
  }, [answer]);

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
    //change hasSaved to true
    setHasSaved(true);
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
    <div className="flex flex-col w-full items-center">
    <PromptDialog question={question} />
      <div className="w-full lg:w-3/4 px-4">
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
                    className="font-mono border pt-2 w-full bg-slate-100 border-gray-300 rounded-lg overflow-y-scroll resize-none"
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
              sandbox="allow-same-origin allow-scripts"
              width="100%"
              height={500}
              className={previewVisible ? ('border-black bg-slate-100 resize') : ('hidden')} />
          </div>
          </div>
      </div>      
    </div>
    </>
  );
};

export default Result;