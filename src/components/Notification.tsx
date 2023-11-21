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
      console.log("show noti");

      const timeout = setTimeout(() => {
        setVisible(false);
        setKey((prevKey) => prevKey + 1);
        console.log("hide noti");
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
                   text-center flex flex-row text-white bottom-0 left-10 
                   fixed p-3 border rounded-xl transition-transform duration-[${time}ms] 
                   transform translate-y-full animate-slidein-bottomleft`;
      break;
    case "error":
      notiStyle = `bg-red-500 
                   text-center flex flex-row text-white bottom-0 left-10 
                   fixed p-3 border rounded-xl transition-transform duration-[${time}ms] 
                   transform translate-y-full animate-slidein-bottomleft`;
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
        stroke="grey"
        className="h-8 shrink-0"
      >
        <rect
          x="5"
          y="2"
          width="14"
          height="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="grey"
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
      <p>{notificationMessage}</p>
    </div>
  ) : null;
};

export default Notification;
