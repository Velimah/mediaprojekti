import { useState, useRef } from "react";

const Result = () => {
  const [code, setCode] = useState<string>("");
  const previewFrame = useRef<HTMLIFrameElement>(null);

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

  const handleCopy = () => {
    // Copy logic here
  };

  const handleBuild = () => {
    // Build logic here
  };

  const handleSave = () => {
    // Save logic here
  };

  return (
    <>
      <div className="w-[1000px]">
        <div className="mb-4">
          <div className="bg-white flex flex-col items-center border border-black rounded">
            <h2 className="text-white bg-black font-bold w-full">Code</h2>
            <div className="w-full p-4">
              <textarea
                id="code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                rows={15}
                cols={50}
                className="border p-2 w-full bg-slate-100 border-gray-300 rounded-lg overflow-y-scroll resize-none"
              >aaa</textarea>
            </div>
            <div className="mb-4 space-x-2">
              <button
                onClick={handleUndo}
                className="bg-black text-white py-2 px-4 rounded"
              >
                Undo
              </button>
              <button
                onClick={handleCopy}
                className="bg-black text-white py-2 px-4 rounded"
              >
                Copy
              </button>
              <button
                onClick={handleBuild}
                className="bg-black text-white py-2 px-4 rounded"
              >
                Build
              </button>
              <button
                onClick={handleSave}
                className="bg-black text-white py-2 px-4 rounded"
              >
                Save
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
          <h2 className="bg-black text-white font-bold w-full">Preview</h2>
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
