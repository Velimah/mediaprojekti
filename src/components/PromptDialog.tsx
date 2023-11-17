import React, { useState } from 'react';
import PropTypes from 'prop-types';

interface PromptDialog {
    question: string;
}

const PromptDialog: React.FC<{ question: string }> = ({
    question,
}) => {

    const [hide, setHide] = useState<boolean>(true);

    const hideToggle = () => {
        setHide(!hide);
        handleResize(0);
    }

    const [btnPosition, setBtnPosition] = useState<number>(0);

    const resizeFrame = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
    
        const initialX = e.clientX;
    
        const handleMouseMove = (e: MouseEvent) => {
          const newWidth = btnPosition + (e.clientX - initialX);
          handleResize(newWidth);
        };
    
        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
    
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    
      const handleResize = (newWidth: number) => {
        setBtnPosition(newWidth);
      };

    return(
        <div style={{bottom: btnPosition}} className="mb-8 fixed md:left-0 md:ml-8 mx-4 w-auto" id="userPrompt">
        {hide ? (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-md shadow-lg w-full md:w-[500px]">
        <div className="flex flex-row bg-gray-200 w-full p-3 h-12 items-center justify-between rounded-md">
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
                <h2 className="text-lg font-bold uppercase">Your instructions</h2>
            </div>
            <div className="hover:text-white absolute right-2 cursor-pointer">
                <button onClick={hideToggle} className="rounded-md underline p-2 w-full hover:text-white font-bold cursor-pointer">Hide</button>
            </div>
        </div>
        <div className="flex items-center w-full rounded-md px-4">
        <span className="p-4">{question}</span>
        </div>
        </div>
        ) : (
        <button onMouseDown={resizeFrame} onClick={hideToggle} className="rounded-md bg-black text-white p-3 w-full hover:bg-white hover:text-black border-2 border-black font-bold cursor-pointer">Show instructions</button>
        )}
        </div>
    );
};

PromptDialog.propTypes = {
    question: PropTypes.string.isRequired,
}

export default PromptDialog;