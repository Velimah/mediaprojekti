import React, { useState, createContext, Dispatch, SetStateAction } from "react";

interface HtmlBlock {
  id: string;
  content: string;
}

interface MediaContextProps {
  htmlArray: HtmlBlock[];
  setHtmlArray: Dispatch<SetStateAction<HtmlBlock[]>>;
}

const MediaContext = createContext<MediaContextProps>({
  htmlArray: [],
  setHtmlArray: () => {},
});

const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [htmlArray, setHtmlArray] = useState<HtmlBlock[]>([
    { id: "documentStart", content: '<!DOCTYPE html>\n<html lang="en">\n<body style="margin: auto;">\n' },
    { id: "documentEnd", content: "\n</body>\n</html>" },
  ]);
  return (
    <MediaContext.Provider
      value={{
        htmlArray,
        setHtmlArray,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaProvider };
