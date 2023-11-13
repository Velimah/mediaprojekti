import { useState } from "react";
import { useChat } from "../contexts/ChatContext";

const urli: string = "http://localhost:8000/gpt/completions";

const useChatGPT = () => {
  const { dispatch } = useChat();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const postQuestion = async (
    role: string,
    newQuestion: string
  ): Promise<string> => {
    
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: role, prompt: newQuestion }),
    };

    try {
      setLoading(true);

      dispatch({ type: "SET_QUESTION", payload: newQuestion });

      const response = await fetch(urli, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.text();

      console.log('fetch data', data);

      setResult(data);

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { postQuestion, loading };
};


export { useChatGPT };
