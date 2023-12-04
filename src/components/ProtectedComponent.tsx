import React from "react";
import { useUser } from "../contexts/UserContext";

interface ProtectedComponentProps {
  hasAuth: React.JSX.Element;
  noAuth?: React.JSX.Element; // optional
}

// Takes component/view/elements etc. as props to show if logged in or not
// e.g. <ProtectedComponent noAuth={<component/>} hasAuth={<anothercomponent/>}/>
// or   <ProtectedComponent hasAuth={<component/>}/>
const ProtectedComponent: React.FC<ProtectedComponentProps> = ({ hasAuth, noAuth }) => {
const { user } = useUser();

  return !user?.accessToken ? (
    noAuth
  ) : (
    hasAuth
  );
};

export default ProtectedComponent; 
