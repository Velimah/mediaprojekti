import React, { useState, createContext, Dispatch, SetStateAction } from "react";

export interface HtmlBlock {
  id: number;
  name: string;
  content: string;
}

interface HtmlContextProps {
  htmlArray: HtmlBlock[];
  setHtmlArray: Dispatch<SetStateAction<HtmlBlock[]>>;
  pastHtmlArrays: HtmlBlock[][];
  setPastHtmlArrays: Dispatch<SetStateAction<HtmlBlock[][]>>;
  lastHtmlBlockId: number | null;
  setLastHtmlBlockId: Dispatch<SetStateAction<number | null>>;
}

const HtmlContext = createContext<HtmlContextProps>({
  htmlArray: [],
  setHtmlArray: () => {},
  pastHtmlArrays: [],
  setPastHtmlArrays: () => {},
  lastHtmlBlockId: null,
  setLastHtmlBlockId: () => {},
});

const HtmlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [htmlArray, setHtmlArray] = useState<HtmlBlock[]>([
    { id: 0, name: "documentStart", content: '<!DOCTYPE html>\n<html lang="en">\n<body style="margin: auto;">\n' },
    { id: 1000, name: "documentEnd", content: "\n</body>\n</html>" },
  ]);
  const [pastHtmlArrays, setPastHtmlArrays] = useState<HtmlBlock[][]>([]);
  const [lastHtmlBlockId, setLastHtmlBlockId] = useState<number | null>(null); // The index of the last edited html block in htmlArray

  return (
    <HtmlContext.Provider
      value={{
        htmlArray,
        setHtmlArray,
        pastHtmlArrays,
        setPastHtmlArrays,
        lastHtmlBlockId,
        setLastHtmlBlockId,
      }}
    >
      {children}
    </HtmlContext.Provider>
  );
};

export { HtmlContext, HtmlProvider };
