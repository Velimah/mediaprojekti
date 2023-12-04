import { createContext, useReducer,useContext, ReactNode, Dispatch } from "react";

export type ChatState = {
  question: string;
  answer: string;
  editedanswer: string;
};

const initialChatState: ChatState = {
  question: "",
  answer: "",
  editedanswer: "",
};

type ChatAction =
  | { type: "SET_QUESTION"; payload: string }
  | { type: "SET_ANSWER"; payload: string }
  | { type: "EDIT_ANSWER"; payload: string };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "SET_QUESTION":
      return { ...state, question: action.payload };
    case "SET_ANSWER":
      return { ...state, answer: action.payload };
    case "EDIT_ANSWER":
      return { ...state, editedanswer: action.payload };
    default:
      return state;
  }
};

type ChatContextType = {
  state: ChatState;
  dispatch: Dispatch<ChatAction>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("ChatContext not found");
  }
  return context;
};

type ChatProviderProps = { children: ReactNode };

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
