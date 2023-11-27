import { useState } from "react";

// TODO: Update to backend URL when pushing to main, switch to localhost when testing locally
// server URL https://medpal-catkos.northeurope.cloudapp.azure.com/user
const urli: string = "http://localhost:8000/user";

const useUsers = () => {
  const [loading, setLoading] = useState(false);

  const registerUser = async (username: string, password: string): Promise<string> => {
    const options: RequestInit = {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    };

    try {
      setLoading(true);

      const response = await fetch(urli + "/register", options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.text();

      console.log("response: ", response);
      console.log("data: ", data);

      return data;
    } catch (error) {
      console.log("error: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { registerUser, loading };
}


export { useUsers };
