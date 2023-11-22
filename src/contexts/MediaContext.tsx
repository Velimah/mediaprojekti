import React, { useState, createContext, Dispatch, SetStateAction } from "react";

export interface HtmlBlock {
  id: number;
  name: string;
  content: string;
}

interface MediaContextProps {
  user?: null | any;
  setUser: Dispatch<SetStateAction<null | any>>;
  htmlArray: HtmlBlock[];
  setHtmlArray: Dispatch<SetStateAction<HtmlBlock[]>>;
}

const MediaContext = createContext<MediaContextProps>({
  user: null,
  setUser: () => {},
  htmlArray: [],
  setHtmlArray: () => {},
});

const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<null | any>(null);
  const [htmlArray, setHtmlArray] = useState<HtmlBlock[]>([
    { id: 0, name: "documentStart", content: '<!DOCTYPE html>\n<html lang="en">\n<body style="margin: auto;">\n' },
    { id: 1000, name: "documentEnd", content: "\n</body>\n</html>" },
  ]);
  return (
    <MediaContext.Provider
      value={{
        user,
        setUser,
        htmlArray,
        setHtmlArray,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaProvider };
