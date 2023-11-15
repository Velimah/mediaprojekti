import { useEffect, useState } from "react";
import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
  const { notificationReason, notificationMessage, setNotification } = useNotification();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);

    const timeout = setTimeout(() => {
      setVisible(false);
      setNotification("", "");
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, [notificationReason, notificationMessage, setNotification]);

  let notiStyle = "";
  if (notificationReason === "error") {
    notiStyle =
      "bg-red-500 text-center flex flex-row text-white bottom-0 left-10 fixed p-3 border rounded-xl transition-transform duration-3000 transform translate-y-full animate-slidein-bottomleft";
  } else if (notificationReason === "default") {
    notiStyle =
      "bg-black text-center flex flex-row text-white bottom-0 left-10 fixed p-3 border rounded-xl transition-transform duration-3000 transform translate-y-full animate-slidein-bottomleft";
  } else {
    notiStyle = "hidden"
  }

  return notificationMessage !== "" && visible ? (
    <div className={`notification ${notiStyle}`}>
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
