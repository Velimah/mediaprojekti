import React, { useState } from "react";
import PropTypes from "prop-types";

interface PromptDialog {
  question: string;
}

const PromptDialog: React.FC<{ question: string }> = ({
    question,
}) => {

    const [hide, setHide] = useState<boolean>(true);
    const [handleCloseAnim, setHandleCloseAnim] = useState<boolean>(false);

    return(
        <>
        {hide ? (
            <div className={`w-full md:w-auto fixed top-2/4 -translate-y-1/2 md:ml-5 ${handleCloseAnim ? 'animate-slide-left-out -left-1/2' : 'animate-fade-in left-0 '}`}
            onAnimationEnd={() => {
            if(handleCloseAnim){
                setHide(false);
                setHandleCloseAnim(false);
            }}}
        >
            <div className="flex flex-col items-center bg-ai-black shadow-2xl rounded-md w-full md:w-[500px]">
                <div className="flex flex-row bg-ai-tertiary w-full p-3 h-12 items-center justify-between rounded-md">
                    <div className='flex items-center'>
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
                        <h2 className="text-lg font-bold font-robot uppercase">Your prompt</h2>
                    </div>
                    <div className="hover:text-white relative right-2 cursor-pointer">
                        <button onClick={()=>setHandleCloseAnim(!handleCloseAnim)} className="rounded-md underline p-2 w-full hover:text-white font-bold cursor-pointer">Hide</button>
                    </div>
                </div>
                <div className="flex items-center w-full rounded-md px-4">
                <span className="p-4 text-white">{question}</span>
                </div>
            </div>
        </div>
        ) : (
            <div className={`fixed left-0 top-2/4 -translate-y-1/2 ml-5 animate-slide-left cursor-pointer hover:scale-110 transition-scale duration-300 ease-in-out `}
                onClick={()=>setHide(true)}
            >
                <div className="flex flex-col items-center bg-ai-black shadow-2xl rounded-md w-full">
                    <div className="flex flex-row bg-ai-tertiary w-full p-3 h-12 items-center justify-between rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        )
        }
        
        </>
    );
};

PromptDialog.propTypes = {
  question: PropTypes.string.isRequired,
};

export default PromptDialog;
