import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";

interface User {
  accessToken: string;
}

const parseJwt = (token: string): { exp: number } | null => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { setNotification } = useNotification();

  const Logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setNotification("default", "Logged out, session expired.");
    navigate("/");
  };

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user: User = JSON.parse(userString);

      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
        Logout();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return null;
};

export default AuthVerify;
