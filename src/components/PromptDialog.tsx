import React, { useState } from "react";
import PropTypes from "prop-types";

interface PromptDialog {
  question: string;
}

const PromptDialog: React.FC<{ question: string }> = ({ question }) => {
  const [hide, setHide] = useState<boolean>(true);

  /* hide prompt toggle */
  const hideToggle = () => {
    setHide(!hide);
  };

  return (
    <div className='md:mb-8 bottom-0 fixed md:left-0 md:ml-8 mx-4 w-full md:auto' id='userPrompt'>
      {hide ? (
        <div className='flex flex-col items-center bg-white border border-gray-200 rounded-md shadow-lg w-full md:w-[500px] animate-fade-in'>
          <div className='flex flex-row bg-gray-200 w-full p-3 h-12 items-center justify-between rounded-md'>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 10'
                strokeWidth='1.5'
                stroke='black'
                className='h-12 shrink-0'
              >
                <rect x='5' y='2' width='14' height='9' strokeLinecap='round' strokeLinejoin='round' fill='black' />
                <circle
                  cx='8.5'
                  cy='6.5'
                  r='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  fill='white'
                  className='animate-pulse'
                />
                <circle
                  cx='15.5'
                  cy='6.5'
                  r='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  fill='white'
                  className='animate-pulse'
                />
              </svg>
              <span className='pr-4 font-bold'>:</span>
              <h2 className='text-lg font-bold font-mono uppercase'>Your instructions</h2>
            </div>
            <div className='hover:text-white relative right-2 cursor-pointer'>
              <button
                onClick={hideToggle}
                className='rounded-md underline p-2 w-full hover:text-white font-bold cursor-pointer'
              >
                Hide
              </button>
            </div>
          </div>
          <div className='flex items-center w-full rounded-md px-4'>
            <span className='p-4'>{question}</span>
          </div>
        </div>
      ) : (
        <button
          onClick={hideToggle}
          className='rounded-md bg-black text-white p-3 hover:bg-white hover:text-black border-2 border-black font-bold cursor-pointer w-full md:w-auto'
        >
          Show instructions
        </button>
      )}
    </div>
  );
};

PromptDialog.propTypes = {
  question: PropTypes.string.isRequired,
};

export default PromptDialog;
