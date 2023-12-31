import PropTypes from 'prop-types';

interface AlertDialogProps {
  content: string;
  onClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  content,
  onClose,
}) => {
    return (
      <div className="w-full h-full overflow-hidden absolute top-1/2 left-1/2 transform translate-x-[-50%] -translate-y-1/2 z-[1] bg-black bg-opacity-25" id="alertDialog">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1] w-full md:w-[35rem] h-auto bg-ai-black-100 rounded-lg shadow-lg animate-alert-pop-up">
          <div className="text-ai-primary hover:text-ai-secondary cursor-pointer absolute right-0 pr-4 pt-4" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="p-10">
            <div className="text-center pb-4 text-white">
              <span className="text-2xl font-bold font-robot">ERR0R!</span>
            </div>
            <div className="flex items-center justify-center">
              {/* Robot mascot vector */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="h-[70px] shrink-0 hover:animate-bounce"
              >
                <rect
                  x="5"
                  y="2"
                  width="14"
                  height="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="white"
                />
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="white"
                />
                <rect
                  x="5"
                  y="21"
                  width="4"
                  height="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="white"
                />
                <rect
                  x="15"
                  y="21"
                  width="4"
                  height="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="white"
                />
                {/* X shaped eyes */}
                <line
                  x1="7"
                  y1="4.5"
                  x2="10"
                  y2="7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <line
                  x1="10"
                  y1="4.5"
                  x2="7"
                  y2="7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <line
                  x1="14"
                  y1="4.5"
                  x2="17"
                  y2="7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <line
                  x1="17"
                  y1="4.5"
                  x2="14"
                  y2="7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>
              <div className="ml-4 flex items-center">
                <span className="text-lg pr-4 text-white">:</span>
                <span className="bg-white p-3 rounded-md shrink font-robot">
                  {content}
                </span>
              </div>
            </div>
            <div className="pt-6">
                <button onClick={onClose} className="transition duration-300 ease-in-out rounded-md text-white p-3 w-full hover:text-ai-black hover:bg-ai-secondary hover:border-ai-secondary border-2 border-ai-primary font-bold cursor-pointer">OK</button>
            </div>
          </div>
        </div>
      </div>
    );
};

AlertDialog.propTypes = {
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AlertDialog;