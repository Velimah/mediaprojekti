import { useState, useRef, useEffect } from "react";
import { ChatState, useChat } from "../contexts/ChatContext";
import PromptDialog from "../components/PromptDialog";
import { useLocation } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";
import { useUser } from "../contexts/UserContext";
import { WebsiteData, useUsers } from "../hooks/UserApiHooks";
import ProtectedComponent from "../components/ProtectedComponent";

const Result = () => {
  const { state } = useChat();
  const { setNotification } = useNotification();
  const { user } = useUser();
  const { saveCode, updateUsersSavedWebsite } = useUsers();
  const { /*question,*/ answer /*, editedanswer*/ } = state;
  const originalPrompt = (useLocation().state as ChatState) || {};
  const [originalPromptValues, setOriginalPromptValues] = useState<ChatState>({...originalPrompt});
  const name = useRef(originalPrompt.name);

  const [code, setCode] = useState<string>("");
  const previewFrame = useRef<HTMLIFrameElement>(null);
  const codeTextarea = useRef<HTMLTextAreaElement>(null);
  const [previewWidth, setPreviewWidth] = useState<string>("100%");

  const [codeVisible, setCodeVisible] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(true);

  const [hasSaved, setHasSaved] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [openSave, setOpenSave] = useState<boolean>(false);
  const [handleCloseSave, setHandleCloseSave] = useState<boolean>(false);

  /* add a warning when user is about to exit/refresh page IF not saved before new changes */
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.returnValue =
        "Are you sure you want to leave? Your build may not be saved - please remember to save before leaving!";
    };
    !hasSaved && window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasSaved]);

  useEffect(() => {
    // Update the code state with the current answer
    if (answer) {
      setCode(answer);
    }
  }, [answer]);

  useEffect(() => {
    // from account view
    setCode(originalPrompt.answer);
  }, [originalPrompt.answer]);

  useEffect(() => {
    // Disable scrolling when save modal is open
    if (openSave) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openSave]);

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
    setNotification("default", "Changes reversed");
  };

  const handleCopy = async () => {
    try {
      if (codeTextarea.current) {
        await navigator.clipboard.writeText(codeTextarea.current.value);
        setNotification("default", "Copied to clipboard");
      }
    } catch (error) {
      console.log("Error when copying to clipboard: ", error);
      setNotification("error", "Something went wrong.");
    }
  };

  const handleBuild = () => {
    // Build logic here
    setNotification("default", "Built!");
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      if (name.current !== "" && user) {
        if (originalPromptValues._id !== undefined) {
          const site: WebsiteData = {
            _id: originalPromptValues._id,
            name: name.current,
            originalPrompt: originalPromptValues.question,
            html: code,
            previewimage: null,
          };
          setOpenSave(false);
          setNotification("default", "Updating...");
          await updateUsersSavedWebsite(site._id, site, user);
          setNotification("default", "Updated!");
          setHasSaved(true);
        } else {
          setOpenSave(false);
          setNotification("default", "Saving...");

          const response = await saveCode(
            originalPrompt.question,
            name.current,
            code,
            user
          );

          const parsedResponse = JSON.parse(response);

          setOriginalPromptValues({
            ...originalPromptValues,
            _id: parsedResponse._id,
          });

          setNotification("default", "Saved!");
          setHasSaved(true);
        }
      } else {
        setNotification("default", "Code was not saved");
      }
    } catch (error) {
      console.log(error);
      setNotification("error", "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  handleRunCode();

  const handleSaveToFile = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const fileLink = document.createElement("a");
    fileLink.href = url;
    const sanitizename = name.current.replace(/[\\/:"*?<>|]/g, '') // use as filename if it does not contain unsupported characters
    fileLink.download = `${sanitizename !== '' ? name.current : 'your-website'}.html`;
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

  // render a save popup
  // TODO: make own component of this/modify alert dialog?
  const SavePopup = () => {
    return (
      <div
        className="w-full h-full overflow-hidden fixed top-1/2 left-1/2 transform translate-x-[-50%] -translate-y-1/2 z-[1] bg-black bg-opacity-25"
        id="alertDialog"
      >
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1] w-full md:w-[35rem] h-auto bg-ai-black-100 rounded-lg shadow-lg ${
            handleCloseSave
              ? "animate-alert-pop-off scale-0"
              : "animate-alert-pop-up"
          }`}
          onAnimationEnd={() => {
            if (handleCloseSave) {
              setOpenSave(false);
              setHandleCloseSave(false);
            }
          }}
        >
          <div
            className={`text-ai-primary hover:text-ai-secondary cursor-pointer absolute right-0 pr-4 pt-4`}
            onClick={() => setHandleCloseSave(!handleCloseSave)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="p-10">
            <div className="text-center pb-4 text-white">
              <span className="text-2xl font-bold font-robot">SAVE</span>
            </div>
            <div className="flex flex-col items-center justify-center font-robot gap-5">
              <label htmlFor="nameInput" className="text-white">
                Enter a name:
              </label>
              <input
                className="border rounded-md py-2 px-4"
                type="text"
                placeholder="Enter name"
                defaultValue={name.current}
                id="nameInput"
                onChange={(e) => {
                  name.current = e.target.value.trim();
                }}
              ></input>
              <button onClick={handleSave} className="primary-btn">
                <span className="flex gap-2 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                    <path
                      fillRule="evenodd"
                      d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zM12 10.5a.75.75 0 01.75.75v4.94l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72v-4.94a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  SAVE
                </span>
              </button>
              <button onClick={handleSaveToFile} className="primary-btn">
                <span className="flex gap-2 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  SAVE AS HTML
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {openSave && <SavePopup />}
      <div className="flex flex-col w-full items-center">
        <PromptDialog question={originalPrompt.question} />
        <div className="w-full lg:w-3/4 px-4">
          <div className="my-4">
            <div className="bg-ai-black-100 flex flex-col items-center border border-ai-black-100 rounded">
              <h2
                className="bg-ai-secondary text-ai-black text-lg font-bold font-robot w-full p-3 h-12 flex items-center uppercase cursor-pointer"
                onClick={toggleCodeVisibility}
              >
                {codeVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 pr-1 toggled hamburger_icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 pr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
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
                    className="selection:bg-ai-black selection:text-ai-secondary font-mono border focus:outline-none focus:border-ai-black focus:ring-ai-black focus:ring-1 p-4 w-full bg-ai-secondary border-ai-black rounded-md overflow-y-scroll resize-none"
                  ></textarea>
                </div>
              )}
              <div className="py-4 md:space-x-2 flex flex-wrap justify-center gap-2">
                <button
                  onClick={handleUndo}
                  className="toolbar-btn w-40 md:w-auto"
                >
                  <span className="flex justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 3.75A5.25 5.25 0 009.75 9v10.19l4.72-4.72a.75.75 0 111.06 1.06l-6 6a.75.75 0 01-1.06 0l-6-6a.75.75 0 111.06-1.06l4.72 4.72V9a6.75 6.75 0 0113.5 0v3a.75.75 0 01-1.5 0V9c0-2.9-2.35-5.25-5.25-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    UNDO
                  </span>
                </button>
                <button
                  onClick={handleCopy}
                  className="toolbar-btn w-40 md:w-auto"
                >
                  <span className="flex justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3A1.501 1.501 0 009 4.5h6A1.5 1.5 0 0013.5 3h-3zm-2.693.178A3 3 0 0110.5 1.5h3a3 3 0 012.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15z"
                        clipRule="evenodd"
                      />
                    </svg>
                    COPY
                  </span>
                </button>
                <button
                  onClick={handleBuild}
                  className="build-btn toolbar-btn w-40"
                >
                  <span className="flex justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                        clipRule="evenodd"
                      />
                    </svg>
                    BUILD
                  </span>
                </button>
                <ProtectedComponent
                  hasAuth={
                    <button
                      onClick={() => setOpenSave(true)}
                      className="build-btn toolbar-btn w-40 disabled:opacity-50"
                      disabled={isSaving}
                    >
                      <span className="flex justify-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.5 3A1.501 1.501 0 009 4.5h6A1.5 1.5 0 0013.5 3h-3zm-2.693.178A3 3 0 0110.5 1.5h3a3 3 0 012.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15z"
                            clipRule="evenodd"
                          />
                        </svg>
                        SAVE
                      </span>
                    </button>
                  }
                  noAuth={<></>}
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="bg-transparent flex flex-col items-center border border-black rounded">
              <h2
                className="bg-ai-primary text-ai-black text-lg font-bold font-robot w-full p-3 h-12 flex items-center uppercase cursor-pointer"
                onClick={togglePreviewVisibility}
              >
                {previewVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 pr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 pr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                Preview ({previewWidth})
              </h2>
              <iframe
                ref={previewFrame}
                title="Code preview"
                sandbox="allow-same-origin allow-scripts"
                style={{ width: previewWidth }}
                height={500}
                className={
                  previewVisible
                    ? "border-black bg-slate-100 resize-x"
                    : "hidden"
                }
              />
            </div>
            {previewVisible && (
              <div
                id="resizePreview"
                className="pt-1 w-full flex flex-row-reverse gap-2"
              >
                <button
                  className={`${
                    previewWidth === "100%" ? "bg-ai-secondary" : "bg-white"
                  } rounded-md p-1  text-ai-black border-2 border-transparent border-ai-primary font-bold cursor-pointer transition duration-300 ease-in-out hover:bg-ai-secondary`}
                  onClick={() => setPreviewWidth("100%")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  className={`${
                    previewWidth === "375px" ? "bg-ai-secondary" : "bg-white"
                  } rounded-md p-1  text-ai-black border-2 border-transparent border-ai-primary font-bold cursor-pointer transition duration-300 ease-in-out hover:bg-ai-secondary`}
                  onClick={() => setPreviewWidth("375px")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-1+"
                  >
                    <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
                    <path
                      fillRule="evenodd"
                      d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
