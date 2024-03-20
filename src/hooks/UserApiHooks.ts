import { useState } from "react";
import { HtmlBlock } from "../contexts/HtmlContext";

// TODO: Update to backend URL when pushing to main, switch to localhost when testing locally
// server URL https://medpal-catkos.northeurope.cloudapp.azure.com/user
const urli: string = "https://www.ai-pagebuilder-backend.vercel.app/user";

export interface UserData {
  id: string;
  username: string;
  accessToken: string;
}

export interface WebsiteData {
  _id : string,
  originalPrompt: string;
  name : string,
  html : string,
  previewimage : string | null
}

export interface advancedWebsiteData {
  _id: string;
  originalCode: string;
  name : string,
  cssLibrary: string,
  htmlarray : HtmlBlock[],
  previewimage : string | null
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

      return data;
    } catch (error) {
      console.log("error: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const authHeader = (user: UserData): string => {
    if (user && user.accessToken) {
      return "Bearer " + user.accessToken;
    } else {
      return "";
    }
  };
  
  // Save html to db
  const saveCode = async (originalPrompt: string, name: string, html: string, user: UserData): Promise<string> => {
    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      headers: {
        "Authorization" : authHeader(user),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalPrompt: originalPrompt, name: name, html: html, user: user.id }),
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

  const getUsersSavedWebsites = async (user: UserData): Promise<WebsiteData[]> => {
    const options: RequestInit = {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: authHeader(user),
        "Content-Type": "application/json",
      },
    };

    try {
      setLoading(true);

      const response = await fetch(urli + "/getsaved/" + user.id, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      return data as WebsiteData[];
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getUsersAdvancedSavedWebsites = async (user: UserData): Promise<advancedWebsiteData[]> => {
    const options: RequestInit = {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: authHeader(user),
        "Content-Type": "application/json",
      },
    };

    try {
      setLoading(true);

      const response = await fetch(urli + "/getsavedadvanced/" + user.id, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      return data as advancedWebsiteData[];
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const updateUsersSavedWebsite = async (websiteId: string, updatedData: WebsiteData, user: UserData): Promise<WebsiteData[]> => {
    const options: RequestInit = {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: authHeader(user),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id, updatedData }),
    };

    try {
      setLoading(true);

      const response = await fetch(urli + "/updatesaved/" + websiteId, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      return data as WebsiteData[];
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUsersSavedWebsite = async (websiteId: string, user: UserData): Promise<void> => {
    const options: RequestInit = {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: authHeader(user),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id }),
    };

    try {
      setLoading(true);

      const response = await fetch(urli + "/deletesaved/" + websiteId, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      console.log("deleted");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  
  const deleteUsersSavedAdvancedWebsite = async (websiteId: string, user: UserData): Promise<void> => {
    const options: RequestInit = {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: authHeader(user),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id }),
    };

    try {
      setLoading(true);

      const response = await fetch(urli + "/deleteadvancedsaved/" + websiteId, options);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      console.log("deleted");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const advancedSaveCode = async (originalCode: string, name: string, cssLibrary: string,  html: HtmlBlock[], user: UserData): Promise<string> => {
    if (!cssLibrary) cssLibrary="";

    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      headers: {
        "Authorization" : authHeader(user),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, cssLibrary: cssLibrary, user: user.id, originalCode: originalCode, html: html }),
    };

    try {
      setLoading(true);
      
      const response = await fetch(urli + "/advancedsavecode", options);

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


  const updateUsersAdvancedSavedWebsite = async (websiteId: string, updatedData: advancedWebsiteData, user: UserData): Promise<advancedWebsiteData[]> => {
    const options: RequestInit = {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: authHeader(user),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id, updatedData }),
    };

    try {
      setLoading(true);

      const response = await fetch(
        urli + "/updatesavedadvanced/" + websiteId,
        options
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();

      return data as advancedWebsiteData[];
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loginUser,
    loading,
    saveCode,
    getUsersSavedWebsites,
    getUsersAdvancedSavedWebsites,
    updateUsersSavedWebsite,
    deleteUsersSavedWebsite,
    advancedSaveCode,
    deleteUsersSavedAdvancedWebsite,
    updateUsersAdvancedSavedWebsite,
  };
}


export { useUsers };
