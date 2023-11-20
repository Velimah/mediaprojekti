import React, { useState, createContext, Dispatch, SetStateAction } from "react";

interface HtmlBlock {
  id: string;
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
    { id: "documentStart", content: '<!DOCTYPE html>\n<html lang="en">\n<body style="margin: auto;">\n' },
    { id: "documentEnd", content: "\n</body>\n</html>" },
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
