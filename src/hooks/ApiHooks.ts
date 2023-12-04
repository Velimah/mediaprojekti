import { useState } from "react";
import { useChat } from "../contexts/ChatContext";

// TODO: Update to backend URL when pushing to main, switch to localhost when testing locally
// server URL https://medpal-catkos.northeurope.cloudapp.azure.com || http://localhost:8000
const urli: string = "http://localhost:8000";
const urlTxt: string = "/gpt/completions";
const urlImg: string = "/gpt/generations";

const useChatGPT = () => {
  const { dispatch } = useChat();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const postQuestion = async (role: string, newQuestion: string): Promise<string> => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: role, prompt: newQuestion }),
    };
    console.log("Prompt:", newQuestion);

    try {
      setLoading(true);

      //dispatch({ type: "SET_QUESTION", payload: newQuestion });

      const response = await fetch(urli + urlTxt, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();

      dispatch({ type: "SET_ANSWER", payload: data });

      console.log(data);

      // if GPT's answer start with sorry/I/Of, throw a new error
      if (data.startsWith("Sorry") || data.startsWith("I") || data.startsWith("Of")) {
        throw new Error("Sorry, I don't undertand. Could you please rephrase?");
      }

      setResult(data);
      // console.log to pass linter test for now
      console.log("API Success:", result);
      // changed result to data, result returned undefined/empty
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /* Generate image from DALL-E */
  const getImage = async (newQuestion: string, size: string): Promise<string> => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: newQuestion, size: size }),
    };
    console.log("Prompt:", newQuestion);

    try {
      setLoading(true);

      const response = await fetch(urli + urlImg, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.text();

      dispatch({ type: "SET_ANSWER", payload: data });

      console.log(data);

      setResult(data);
      // console.log to pass linter test for now
      console.log("API Success:", result);
      // changed result to data, result returned undefined/empty
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { postQuestion, getImage, loading, setLoading };
};

export { useChatGPT };
