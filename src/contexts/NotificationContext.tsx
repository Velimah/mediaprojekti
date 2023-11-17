import { ReactNode, createContext, useContext, useState } from "react";

type NotificationReason = "default" | "error" | "";

type NotificationContextType = {
  notificationReason: NotificationReason;
  notificationMessage: string;
  notificationUpdate: boolean;
  setNotification: (reason: NotificationReason, message: string) => void;
};

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

type NotificationProviderProps = { children: ReactNode };

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notificationReason, setNotificationReason] = useState<NotificationReason>("");
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationUpdate, setNotificationUpdate] = useState<boolean>(false);

  const setNotification = (reason: NotificationReason, message: string) => {
    setNotificationReason(reason);
    setNotificationMessage(message);
    setNotificationUpdate((prev) => !prev); // Update even if other values didn't change to make it show again
  };

  return (
    <NotificationContext.Provider value={{ notificationReason, notificationMessage, setNotification, notificationUpdate }}>
      {children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("NotificationContext not found");
  }
  return context;
};
