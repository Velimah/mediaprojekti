import { useState, useRef, useEffect } from "react";
import { useChat } from "../contexts/ChatContext";

const Result = () => {
  const { state } = useChat();
  const { question, answer /*, editedanswer*/ } = state;
  console.log("Question: ", question);

  const [code, setCode] = useState<string>("");
  const previewFrame = useRef<HTMLIFrameElement>(null);
  const codeTextarea = useRef<HTMLTextAreaElement>(null);

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

  const handleSaveToFile = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const fileLink = document.createElement("a");
    fileLink.href = url;
    fileLink.download = "your-website.html";
    fileLink.dispatchEvent(new MouseEvent("click"));
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="w-full md:w-[90vw] mt-6 p-4">
        <div className="mb-4">
          <div className="bg-white flex flex-col items-center border border-black rounded">
            <h2 className="bg-black text-white text-lg font-bold w-full p-1">Code</h2>
            <div className="w-full p-4">
              <textarea
                ref={codeTextarea}
                id="code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                rows={15}
                cols={50}
                className="border p-2 w-full bg-slate-100 border-gray-300 rounded-lg overflow-y-scroll resize-none"
              ></textarea>
            </div>
            <div className="mb-4 space-x-2 flex flex-wrap justify-center">
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
        <div className="mb-4">
          <button
            onClick={handleRunCode}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Show preview
          </button>
        </div>
        <div className="bg-white flex flex-col items-center border border-black rounded">
          <h2 className="bg-black text-white text-lg font-bold w-full p-1">Preview</h2>
          <iframe
            ref={previewFrame}
            title="Code preview"
            sandbox="allow-same-origin"
            width="100%"
            height={500}
            className="border-black bg-slate-100"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Result;
