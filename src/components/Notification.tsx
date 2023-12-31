import { useEffect, useState } from "react";
import { useNotification } from "../contexts/NotificationContext";

const Notification: React.FC = () => {
  const { isInitialCall, notificationReason, notificationMessage, setNotification } = useNotification();
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState<number>(0);
  const time: number = 2000;

  useEffect(() => {
    if (!isInitialCall) {
      setVisible(true);
      //console.log("show noti");

      const timeout = setTimeout(() => {
        setVisible(false);
        setKey((prevKey) => prevKey + 1);
        //console.log("hide noti");
      }, time);

      return () => {
        clearTimeout(timeout);
        setVisible(false);
        setKey((prevKey) => prevKey + 1);
      };
    } else {
      return;
    }
  }, [
    setNotification,
    isInitialCall
  ]);

  let notiStyle: string;

  switch (notificationReason) {
    case "default":
      notiStyle = `bg-black 
                   text-center flex flex-row text-white bottom-0 right-10 
                   fixed p-3 rounded-xl transition-transform duration-[${time}ms] 
                   transform translate-y-full animate-slide-up`;
      break;
    case "error":
      notiStyle = `bg-ai-tertiary
                   text-center flex flex-row text-white bottom-0 right-10 
                   fixed p-3 rounded-xl transition-transform duration-[${time}ms] 
                   transform translate-y-full animate-slide-up`;
      break;
    default:
      notiStyle = "hidden";
      break;
  }

  return visible ? (
    <div key={key} className={`notification ${notiStyle}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 10"
        strokeWidth="1.5"
        stroke="white"
        className="h-8 shrink-0"
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
        <circle
          cx="8.5"
          cy="6.5"
          r="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="black"
          className="animate-pulse"
        />
        <circle
          cx="15.5"
          cy="6.5"
          r="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="black"
          className="animate-pulse"
        />
      </svg>
      <p className="font-robot">{notificationMessage}</p>
    </div>
  ) : null;
};

export default Notification;
