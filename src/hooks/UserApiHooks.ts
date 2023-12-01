import { useState } from "react";

// TODO: Update to backend URL when pushing to main, switch to localhost when testing locally
// server URL https://medpal-catkos.northeurope.cloudapp.azure.com/user
const urli: string = "http://localhost:8000/user";

export interface UserData {
  id: string;
  username: string;
  accessToken: string;
}

const useUsers = () => {
  const [loading, setLoading] = useState(false);

  // Register
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

  // Login
  const loginUser = async (username: string, password: string): Promise<UserData> => {
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

      const response = await fetch(urli + "/login", options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();

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

 function authHeader() {
    const user : UserData = JSON.parse(localStorage.getItem('user') || null);
  
    if (user && user.accessToken) {
      return  'Bearer ' + user.accessToken;
    } else {
      return '';
    }
  }
  

  const saveCode = async (name: string, html: string, userid: string): Promise<string> => {
    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      headers: {
        "Authorization" : authHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, html: html, user: userid }),
    };

    try {
      setLoading(true);

      const response = await fetch(urli + "/savecode", options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.text();

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loginUser, loading, saveCode };
}


export { useUsers };
